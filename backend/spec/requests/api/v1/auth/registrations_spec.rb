require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    context "正しい値が入力されている場合" do
      let(:params) { attributes_for(:user) }

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
      let(:params) { attributes_for(:user, password_confirmation: "") }

      it "ユーザー登録が失敗すること" do
        post api_v1_user_registration_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Password confirmation doesn't match Password") # rubocop:disable Layout/LineLength
        expect(response).to have_http_status(422)
      end
    end
  end
end
