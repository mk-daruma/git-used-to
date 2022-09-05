require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "PUT /api/v1/users#update" do
    context "ログイン前にパスワードを変更したい場合" do
      let(:user) { create(:user, confirmed_at: Date.today) }
      let(:redirect_url) { api_v1_user_registration_path }
      let(:params) { { email: user.email, password: user.password, redirect_url: redirect_url } }
      let(:headers) { user.create_new_auth_token }

      it "パスワード変更用token付きのリンクが貼られたメールが送信される" do
        send_mail = post api_v1_user_password_path, params: params, headers: headers
        expect(send_mail).to change { ActionMailer::Base.deliveries.size }.by(1)
        res = JSON.parse(response.body)
        expect(res["success"]).to eq(true)
        expect(res["message"]).to include("An email has been sent to '#{user.email}' containing instructions for resetting your password.") # rubocop:disable Layout/LineLength
        password_reset_mail = ActionMailer::Base.deliveries.last
        mail_body = password_reset_mail.body.encoded
        password_reset_url = URI.extract(mail_body)[0]
        query = URI.parse(password_reset_url).query
        query_by_hash = Rack::Utils.parse_query(query)
        expect(query_by_hash["redirect_url"]).not_to eq nil
        expect(query_by_hash["reset_password_token"]).not_to eq nil
        expect(query_by_hash["config"]).not_to eq nil
      end
    end
  end
end
