require 'rails_helper'

RSpec.describe "Api::V1::QuizHistoryOfCommittedFiles", type: :request do
  let!(:quiz_history_of_committed_file) { create(:quiz_history_of_committed_file) }
  describe "POST /create" do
    let!(:quiz_branch) { create(:quiz_branch) }
    let!(:quiz_commit_message) { create(:quiz_commit_message) }
    let(:params) do
      {
      _json: [{
        quiz_history_of_committed_file_name: "作成確認用",
        quiz_history_of_committed_file_status: "exists",
        quiz_history_of_committed_file_text_status: "おはようございます",
        quiz_history_of_committed_file_past_text_status: "こんにちは",
        quiz_history_of_committed_file_parent_past_commit_message: "過去のコミットメッセージ",
        quiz_branch_id: quiz_branch.id,
        quiz_commit_message_id: quiz_commit_message.id
        }]
    }
    end
    let(:mulch_params) do
      {
      _json: [{
          quiz_history_of_committed_file_name: "複数作成確認用1",
          quiz_history_of_committed_file_status: "exists",
          quiz_history_of_committed_file_text_status: "おはようございます",
          quiz_history_of_committed_file_past_text_status: "こんにちは",
          quiz_history_of_committed_file_parent_past_commit_message: "過去のコミットメッセージ",
          quiz_branch_id: quiz_branch.id,
          quiz_commit_message_id: quiz_commit_message.id
        },
        {
          quiz_history_of_committed_file_name: "複数作成確認用2",
          quiz_history_of_committed_file_status: "exists",
          quiz_history_of_committed_file_text_status: "おはようございます",
          quiz_history_of_committed_file_past_text_status: "こんにちは",
          quiz_history_of_committed_file_parent_past_commit_message: "過去のコミットメッセージ",
          quiz_branch_id: quiz_branch.id,
          quiz_commit_message_id: quiz_commit_message.id
        }]
    }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_history_of_committed_files_path, params: params }.to change(QuizHistoryOfCommittedFile, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_history_of_committed_file_name"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_history_of_committed_files_path, params: mulch_params }.to change(QuizHistoryOfCommittedFile, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_history_of_committed_file_name"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_history_of_committed_file_name"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /destroy" do
    it "データ削除が成功すること" do
      expect { delete api_v1_quiz_history_of_committed_file_path(quiz_history_of_committed_file.id) }.to change(QuizHistoryOfCommittedFile, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to include("Deleted the post")
      expect(response).to have_http_status(200)
    end
  end
end
