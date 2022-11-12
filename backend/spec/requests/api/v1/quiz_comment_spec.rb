require 'rails_helper'

RSpec.describe "Api::V1::QuizComments", type: :request do
  let!(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz_comment) { create(:quiz_comment) }
  let!(:quiz_comment2) { create(:quiz_comment) }
  let(:param) do
    {
      quiz_comment: {
        user_id: user.id,
        quiz_id: quiz.id,
        comment: "作成確認用",
      },
    }
  end

  describe "GET /index" do
    it "全てのquizデータを取得できていること" do
      get api_v1_quiz_comments_path
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded quiz comments")
      expect(res["data"][0]["id"]).to eq(quiz_comment.id)
      expect(res["data"][1]["id"]).to eq(quiz_comment2.id)
      expect(QuizComment.count).to eq 2
      expect(res["data"].count).to eq 2
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "quiz_commentデータ作成が成功すること" do
      expect { post api_v1_quiz_comments_path, params: param }.to change(QuizComment, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["user_id"]).to eq(user.id)
      expect(res["data"]["quiz_id"]).to eq(quiz.id)
      expect(res["data"]["comment"]).to eq("作成確認用")
      expect(response).to have_http_status(:success)
    end
  end

  describe "delete /destroy" do
    it "quizデータの削除が成功すること" do
      expect { delete api_v1_quiz_comment_path(quiz_comment.id) }.to change(QuizComment, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the quiz comment")
      expect(res["data"]["id"]).to eq(quiz_comment.id)
      expect(response).to have_http_status(:success)
    end
  end
end
