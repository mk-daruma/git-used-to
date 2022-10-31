require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    let(:url) { "sample.url" }

    context "正しい値が入力されている場合" do
      let(:params) { attributes_for(:user, confirm_success_url: [url]) }

      it "ユーザー登録が成功すること" do
        post api_v1_user_registration_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["id"]).to eq(User.last.id)
        expect(res["data"]["user_name"]).to eq(User.last.user_name)
        expect(res["data"]["email"]).to eq(User.last.email)
        expect(response).to have_http_status(200)
      end
    end

    context "password_confirmationの値がpasswordと異なる場合" do
      let(:params) { attributes_for(:user, password_confirmation: "", confirm_success_url: [url]) }

      it "ユーザー登録が失敗すること" do
        post api_v1_user_registration_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Password confirmation doesn't match Password")
        expect(response).to have_http_status(422)
      end
    end

    context "emailの値に'@'が含まれていない時" do
      let(:params) { attributes_for(:user, email: "badadress.com", confirm_success_url: [url]) }

      it "ユーザー登録が失敗すること" do
        post api_v1_user_registration_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Email is not an email")
        expect(response).to have_http_status(422)
      end
    end

    context "emailの値に'.'が含まれていない時" do
      let(:params) { attributes_for(:user, email: "bad@adresscom", confirm_success_url: [url]) }

      it "ユーザー登録が失敗すること" do
        post api_v1_user_registration_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Email is not an email")
        expect(response).to have_http_status(422)
      end
    end

    context "userデータが存在する場合" do
      let(:current_user) { create(:user) }
      let(:headers) { current_user.create_new_auth_token }

      it "userデータの削除が成功すること" do
        delete api_v1_user_registration_path, headers: headers
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["message"]).to include("Account with UID '#{current_user.uid}' has been destroyed.")
        expect(response).to have_http_status(200)
      end
    end

    context "userデータが存在する場合" do
      let(:current_user) { create(:user) }
      let(:current_user2) { create(:user) }
      let(:params) { { password: current_user.password = current_user2.password } }
      let(:headers) { current_user.create_new_auth_token }

      it "userデータのパスワード変更が成功すること" do
        expect(current_user.password).not_to eq(current_user2.password)
        put api_v1_user_registration_path, params: params, headers: headers
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(current_user.password).to eq(current_user2.password)
        expect(response).to have_http_status(200)
      end
    end
  end
end
