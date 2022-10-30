require 'rails_helper'

RSpec.describe "Api::V1::QuizFirstOrLasts", type: :request do
  let!(:quiz) { create(:quiz) }
  let!(:first_or_last) { create(:quiz_first_or_last) }
  let!(:first_or_last2) { create(:quiz_first_or_last) }
  let(:param) do
    {
      quiz_first_or_last: {
        quiz_first_or_last_status: "作成確認用",
        quiz_id: quiz.id,
      },
    }
  end

  describe "POST /create" do
    it "quiz_first_or_lastデータの作成が成功すること" do
      expect do
        post api_v1_quiz_first_or_lasts_path, params: param
      end.to change(QuizFirstOrLast, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_first_or_last_status"]).to eq("作成確認用")
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let!(:related_branchs) do
      create_list(:quiz_branch, 5, quiz_first_or_last: first_or_last)
    end
    let!(:not_related_branch) do
      create(:quiz_branch, quiz_first_or_last: first_or_last2)
    end
    let!(:related_remote_branches) do
      create_list(:quiz_remote_branch, 5, quiz_first_or_last: first_or_last)
    end
    let!(:not_related_remote_branch) do
      create(:quiz_remote_branch, quiz_first_or_last: first_or_last2)
    end

    context "引数がquiz_first_or_lastのidの場合" do
      it "quiz_first_or_lastに紐づいたデータのみを取得すること" do
        get api_v1_quiz_first_or_last_path(first_or_last.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_branchs.each_with_index do |quiz_branch, i|
          expect(res["data_branches"][i]["id"]).to eq(quiz_branch.id)
          expect(res["data_branches"][i]["id"]).not_to eq(not_related_branch.id)
        end
        related_remote_branches.each_with_index do |quiz_remote_branch, i|
          expect(res["data_remote_branches"][i]["id"]).to eq(quiz_remote_branch.id)
          expect(res["data_remote_branches"][i]["id"]).not_to eq(not_related_remote_branch.id)
        end
        expect(res["data_branches"].length).to eq 5
        expect(res["data_remote_branches"].length).to eq 5
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_first_or_lastデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_first_or_last_path(first_or_last.id)
      end.to change(QuizFirstOrLast, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(first_or_last.id)
      expect(response).to have_http_status(:success)
    end
  end
end
