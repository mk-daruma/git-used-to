require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let(:current_user) { create(:user, confirmed_at: Date.today) }

  describe "POST /api/v1/auth/sign_in" do
    context "認証時みでメールアドレス、パスワードが正しい場合" do
      let(:params) { { email: current_user.email, password: current_user.password } }

      it "ログインが成功すること" do
        post api_v1_user_session_path, params: params
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "未認証でメールアドレス、パスワードが正しい場合" do
      let(:uncertified_user) { create(:user) }
      let(:params) { { email: uncertified_user.email, password: uncertified_user.password } }

      it "ログインが失敗すること" do
        post api_v1_user_session_path, params: params
        res = JSON.parse(response.body)
        expect(res["errors"]).to include("A confirmation email was sent to your account at '#{uncertified_user.email}'. You must follow the instructions in the email before your account can be activated") # rubocop:disable Layout/LineLength
        expect(response).to have_http_status(401)
      end
    end

    context "メールアドレスが正しくない場合" do
      let(:params) { { email: "test@example.com", password: current_user.password } }

      it "ログインが失敗すること" do
        post api_v1_user_session_path, params: params
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end

    context "パスワードが正しくない場合" do
      let(:params) { { email: current_user.email, password: "password" } }

      it "ログインが失敗すること" do
        post api_v1_user_session_path, params: params
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    context "ユーザーがログインしている場合" do
      let(:headers) { current_user.create_new_auth_token }

      it "ログアウトができること" do
        delete destroy_api_v1_user_session_path, headers: headers
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(current_user.reload.tokens).to be_blank
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST api/v1/auth/guest_sign_in" do
    context "guest_userがDBに存在せずリクエストが送信された時" do
      before do
        post api_v1_auth_guest_sign_in_path
      end

      it "ゲストログインできること" do
        expect(response).to have_http_status(200)
        header = response.header
        expect(header["access-token"]).to be_present
        expect(header["client"]).to be_present
        expect(header["expiry"]).to be_present
        expect(header["uid"]).to be_present
        expect(header["token-type"]).to be_present
      end

      it "ゲストログインデータの名前/自己紹介文/emailが指定した値であること" do
        res = JSON.parse(response.body)
        expect(res["data"]["user_name"]).to eq("guestuser")
        expect(res["data"]["user_self_introduction"]).to eq("これは自己紹介用のフォームです。ぜひアカウントを作成してご自身の自己紹介をしてみてください！")
        expect(res["data"]["email"]).to eq("guest_user@git-used-to.com")
        expect(res["data"]["nickname"]).to eq("git-used-to見習い")
      end
    end

    context "本来と違う値を持つguest_userがDBに存在してリクエストが送信された場合" do
      let!(:guest_user) do
        create(
          :user,
          email: "guest_user@git-used-to.com",
          user_name: Faker::Alphanumeric.alpha(number: 10),
          user_self_introduction: Faker::Alphanumeric.alpha(number: 30),
          nickname: Faker::Alphanumeric.alpha(number: 10)
        )
      end

      before do
        post api_v1_auth_guest_sign_in_path
      end

      it "ゲストログインできること" do
        expect(response).to have_http_status(200)
        header = response.header
        expect(header["access-token"]).to be_present
        expect(header["client"]).to be_present
        expect(header["expiry"]).to be_present
        expect(header["uid"]).to be_present
        expect(header["token-type"]).to be_present
      end

      it "ゲストログインデータの名前/自己紹介文/emailが指定した値に更新されること" do
        res = JSON.parse(response.body)
        expect(res["data"]["user_name"]).to eq("guestuser")
        expect(res["data"]["user_self_introduction"]).to eq("これは自己紹介用のフォームです。ぜひアカウントを作成してご自身の自己紹介をしてみてください！")
        expect(res["data"]["email"]).to eq("guest_user@git-used-to.com")
        expect(res["data"]["nickname"]).to eq("git-used-to見習い")
      end
    end
  end
end
