require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "PUT /api/v1/users#update" do
    let(:user) { create(:user, user_self_introduction: "こんにちは") }
    let(:user2) { create(:user, user_self_introduction: "こんばんわ") }
    let(:params) do
      {
        user_name: user.user_name = user2.user_name,
        user_self_introduction: user.user_self_introduction = user2.user_self_introduction,
        image: user.image = user2.image,
      }
    end

    it "userデータの編集が成功すること" do
      expect(user).not_to eq(user2)
      put api_v1_user_path(user.id), params: params
      expect(user.user_name).to eq(user2.user_name)
      expect(user.user_self_introduction).to eq(user2.user_self_introduction)
      expect(user.image.to_s).to eq(user2.image.to_s)
      expect(response).to have_http_status(200)
    end
  end
end
