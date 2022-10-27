require 'rails_helper'

RSpec.describe "Api::V1::QuizFirstOrLasts", type: :request do
  let!(:quiz) { create(:quiz) }
  let!(:quiz_first_or_last) { create(:quiz_first_or_last)}
  let!(:quiz_first_or_last2) { create(:quiz_first_or_last)}
  let!(:related_quiz_branchs) { create_list(:quiz_branch, 5, quiz_first_or_last:quiz_first_or_last)}
  let!(:not_related_quiz_branch) { create(:quiz_branch, quiz_first_or_last:quiz_first_or_last2)}
  let!(:related_quiz_remote_branchs) { create_list(:quiz_remote_branch, 5, quiz_first_or_last:quiz_first_or_last)}
  let!(:not_related_quiz_remote_branch) { create(:quiz_remote_branch, quiz_first_or_last:quiz_first_or_last2)}
  let(:param) do
    {
      quiz_first_or_last: {
        quiz_first_or_last_status: "作成確認用",
        quiz_id: quiz.id
      }
    }
  end

  describe "POST /create" do
    it "quiz_first_or_lastデータの作成が成功すること" do
      expect { post api_v1_quiz_first_or_lasts_path, params: param }.to change(QuizFirstOrLast, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_first_or_last_status"]).to eq("作成確認用")
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    context "引数がquiz_first_or_lastのidの場合" do
      it "quiz_first_or_lastに紐づいたデータのみを取得すること" do
        get api_v1_quiz_first_or_last_path(quiz_first_or_last.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_quiz_branchs.each_with_index do |quiz_branch, i|
          expect(res["data_branches"][i]["id"]).to eq(quiz_branch.id)
          expect(res["data_branches"][i]["id"]).not_to eq(not_related_quiz_branch.id)
        end
        related_quiz_remote_branchs.each_with_index do |quiz_remote_branch, i|
          expect(res["data_remote_branches"][i]["id"]).to eq(quiz_remote_branch.id)
          expect(res["data_remote_branches"][i]["id"]).not_to eq(not_related_quiz_remote_branch.id)
        end
        expect(res["data_branches"].length).to eq 5
        expect(res["data_remote_branches"].length).to eq 5
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_first_or_lastデータの削除が成功すること" do
      expect { delete api_v1_quiz_first_or_last_path(quiz_first_or_last.id) }.to change(QuizFirstOrLast, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(quiz_first_or_last.id)
      expect(response).to have_http_status(:success)
    end
  end

  # 他のテスト用
  # describe "POST /create" do
  #   it "" do
  #   end
  # end
end
