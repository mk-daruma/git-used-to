require 'rails_helper'

RSpec.describe "Api::V1::Quizzes", type: :request do
  let(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz2) { create(:quiz) }
  let!(:quiz_first_or_last) { create(:quiz_first_or_last, quiz: quiz) }
  let!(:quiz_first_or_last2) { create(:quiz_first_or_last, quiz: quiz) }
  let!(:quiz_first_or_last3) { create(:quiz_first_or_last, quiz: quiz2) }
  let!(:quiz_first_or_last4) { create(:quiz_first_or_last, quiz: quiz2) }
  let(:param) do
    {
      quiz: {
        user_id: user.id,
        quiz_title: "作成確認用",
        quiz_introduction: "これはcureateでデータが保存できるか確認するための値です",
        quiz_type: "user",
      },
    }
  end
  let(:update) do
    {
      quiz: {
        user_id: user.id,
        quiz_title: quiz2.quiz_title,
        quiz_introduction: quiz2.quiz_introduction,
        quiz_type: quiz.quiz_type,
      },
    }
  end

  describe "GET /index" do
    it "全てのquizデータを取得できていること" do
      get api_v1_quizzes_path
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded quizzes")
      expect(res["data"][0]["id"]).to eq(quiz.id)
      expect(res["data"][1]["id"]).to eq(quiz2.id)
      expect(Quiz.count).to eq 2
      expect(res["data"].count).to eq 2
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "quizデータ作成が成功すること" do
      expect { post api_v1_quizzes_path, params: param }.to change(Quiz, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_title"]).to eq("作成確認用")
      expect(res["data"]["quiz_introduction"]).to eq("これはcureateでデータが保存できるか確認するための値です")
      expect(res["data"]["quiz_type"]).to eq("user")
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    context "引数がquizのidの場合" do
      it "quizに紐づいたquiz_first_or_lastsのデータのみを取得すること" do
        get api_v1_quiz_path(quiz.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        expect(res["quiz_data"]["id"]).to eq(quiz.id)
        expect(res["quiz_data"]["id"]).not_to eq(quiz2.id)
        expect(res["quiz_first_or_lasts_data"][0]["id"]).to eq(quiz_first_or_last.id)
        expect(res["quiz_first_or_lasts_data"][1]["id"]).to eq(quiz_first_or_last2.id)
        expect(res["quiz_first_or_lasts_data"][0]["id"]).not_to eq(quiz_first_or_last3.id)
        expect(res["quiz_first_or_lasts_data"][1]["id"]).not_to eq(quiz_first_or_last4.id)
        expect(res["quiz_first_or_lasts_data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PATCH /update" do
    it "quizデータの更新が成功すること" do
      patch api_v1_quiz_path(quiz.id), params: update
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_title"]).to eq(quiz2.quiz_title)
      expect(res["data"]["quiz_introduction"]).to eq(quiz2.quiz_introduction)
      expect(response).to have_http_status(:success)
    end
  end

  describe "delete /destroy" do
    it "quizデータの削除が成功すること" do
      expect { delete api_v1_quiz_path(quiz.id) }.to change(Quiz, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(quiz.id)
      expect(response).to have_http_status(:success)
    end
  end
end
