require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let(:user) { create(:user, user_self_introduction: "こんにちは") }
  let(:user2) { create(:user, user_self_introduction: "こんばんわ") }
  let!(:user_quiz1) { create(:quiz, user: user) }
  let!(:user_quiz2) { create(:quiz, user: user) }
  let!(:user2_quiz1) { create(:quiz, user: user2) }
  let!(:user2_quiz2) { create(:quiz, user: user2) }

  describe "GET /api/v1/users#show" do
    context "引数がquizのidの場合" do
      it "userの関連しているquizデータのみを取得できること" do
        get api_v1_user_path(user.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        expect(res["data"][0]["id"]).to eq(user_quiz1.id)
        expect(res["data"][1]["id"]).to eq(user_quiz2.id)
        expect(res["data"][0]["id"]).not_to eq(user2_quiz1.id)
        expect(res["data"][1]["id"]).not_to eq(user2_quiz2.id)
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PUT /api/v1/users#update" do
    let(:params) do
      {
        user_name: user2.user_name,
        user_self_introduction: user2.user_self_introduction,
        image: user2.image,
      }
    end

    it "userデータの編集が成功すること" do
      put api_v1_user_path(user.id), params: params
      res = JSON.parse(response.body)
      expect(res["status"]).to eq(200)
      expect(res["data"]["user_name"]).to eq(user2.user_name)
      expect(res["data"]["user_self_introduction"]).to eq(user2.user_self_introduction)
      # expect(res["data"]["image"]).to eq(user2.image) 本来は画像テストも行うべきだが、テスト方法がわからないため一旦後回し
      expect(response).to have_http_status(200)
    end
  end
end
