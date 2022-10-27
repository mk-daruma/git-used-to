require 'rails_helper'

RSpec.describe "Api::V1::QuizCommitMessages", type: :request do
  let!(:quiz_branch) { create(:quiz_branch) }
  let!(:quiz_commit_message) { create(:quiz_commit_message) }

  describe "POST /create" do
    let(:params) do
      {
      _json: [{
          quiz_branch_id: quiz_branch.id,
          quiz_commit_message: "作成確認用"
        }]
    }
    end
    let(:mulch_params) do
      {
      _json: [{
          quiz_branch_id: quiz_branch.id,
          quiz_commit_message: "複数作成確認用1"
        },
        {
          quiz_branch_id: quiz_branch.id,
          quiz_commit_message: "複数作成確認用2"
        }]
    }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_commit_messages_path, params: params }.to change(QuizCommitMessage, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_commit_message"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_commit_messages_path, params: mulch_params }.to change(QuizCommitMessage, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_commit_message"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_commit_message"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /show" do
    let!(:quiz_commit_message2) { create(:quiz_commit_message) }
    let!(:related_quiz_repository_files) { create_list(:quiz_repository_file, 5, quiz_branch:quiz_branch, quiz_commit_message:quiz_commit_message) }
    let!(:not_related_quiz_repository_file) { create(:quiz_repository_file, quiz_branch:quiz_branch, quiz_commit_message:quiz_commit_message2) }
    let!(:related_quiz_history_of_committed_files) { create_list(:quiz_history_of_committed_file, 5, quiz_branch:quiz_branch, quiz_commit_message:quiz_commit_message) }
    let!(:not_related_quiz_history_of_committed_file) { create(:quiz_history_of_committed_file, quiz_branch:quiz_branch, quiz_commit_message:quiz_commit_message2) }

    context "引数がquiz_commit_messageのidの場合" do
      it "quiz_commit_messageに紐づいたデータのみを取得すること" do
        get api_v1_quiz_commit_message_path(quiz_commit_message.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_quiz_repository_files.each_with_index do |repository_file, i|
          expect(res["data_repository_files"][i]["id"]).to eq(repository_file.id)
          expect(res["data_repository_files"][i]["id"]).not_to eq(not_related_quiz_repository_file.id)
        end
        related_quiz_history_of_committed_files.each_with_index do |history_of_committed_file, i|
          expect(res["data_history_of_committed_files"][i]["id"]).to eq(history_of_committed_file.id)
          expect(res["data_history_of_committed_files"][i]["id"]).not_to eq(not_related_quiz_history_of_committed_file.id)
        end
        expect(res["data_repository_files"].length).to eq 5
        expect(res["data_history_of_committed_files"].length).to eq 5
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_commit_messageデータの削除が成功すること" do
      expect { delete api_v1_quiz_commit_message_path(quiz_commit_message.id) }.to change(QuizCommitMessage, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(quiz_commit_message.id)
      expect(response).to have_http_status(:success)
    end
  end
end
