require 'rails_helper'

RSpec.describe "Api::V1::QuizRemoteRepositoryFiles", type: :request do
  let!(:quiz_remote_repository_file) { create(:quiz_remote_repository_file) }
  describe "POST /create" do
    let!(:quiz_remote_branch) { create(:quiz_remote_branch) }
    let!(:quiz_remote_commit_message) { create(:quiz_remote_commit_message) }
    let(:params) do
      {
      _json: [{
        quiz_remote_repository_file_name: "新規作成",
        quiz_remote_repository_file_status: "おはようございます",
        quiz_remote_repository_file_text_status: "こんにちは",
        quiz_remote_branch_id: quiz_remote_branch.id,
        quiz_remote_commit_message_id: quiz_remote_commit_message.id
        }]
    }
    end
    let(:mulch_params) do
      {
      _json: [{
        quiz_remote_repository_file_name: "複数作成確認用1",
        quiz_remote_repository_file_status: "おはようございます",
        quiz_remote_repository_file_text_status: "こんにちは",
        quiz_remote_branch_id: quiz_remote_branch.id,
        quiz_remote_commit_message_id: quiz_remote_commit_message.id
        },
        {
        quiz_remote_repository_file_name: "複数作成確認用2",
        quiz_remote_repository_file_status: "おはようございます",
        quiz_remote_repository_file_text_status: "こんにちは",
        quiz_remote_branch_id: quiz_remote_branch.id,
        quiz_remote_commit_message_id: quiz_remote_commit_message.id
        }]
    }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_remote_repository_files_path, params: params }.to change(QuizRemoteRepositoryFile, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_remote_repository_file_name"]).to eq("新規作成")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect { post api_v1_quiz_remote_repository_files_path, params: mulch_params }.to change(QuizRemoteRepositoryFile, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_remote_repository_file_name"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_remote_repository_file_name"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_remote_repository_fileデータの削除が成功すること" do
      expect { delete api_v1_quiz_remote_repository_file_path(quiz_remote_repository_file.id) }.to change(QuizRemoteRepositoryFile, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(quiz_remote_repository_file.id)
      expect(response).to have_http_status(:success)
    end
  end
end
