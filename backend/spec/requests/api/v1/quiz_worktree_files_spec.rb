require 'rails_helper'

RSpec.describe "Api::V1::QuizWorktreeFiles", type: :request do
  let(:branch) { create(:quiz_branch) }
  let(:worktree_file) { create(:quiz_worktree_file) }
  let(:worktree_file2) { create(:quiz_worktree_file, quiz_worktree_file_text_status: "こんにちは") }

  describe "GET /create" do
    let(:params) do
      {
        _json: [
          {
            quiz_worktree_file_name: "ファイル名",
            quiz_worktree_file_text_status: "こんにちは",
            quiz_branch_id: branch.id,
          },
        ],
      }
    end
    let(:mulch_params) do
      {
        _json: [
          {
            quiz_worktree_file_name: "ファイル名",
            quiz_worktree_file_text_status: "こんにちは",
            quiz_branch_id: branch.id,
          },
          {
            quiz_worktree_file_name: "ファイル名2",
            quiz_worktree_file_text_status: "おはようございます",
            quiz_branch_id: branch.id,
          },
        ],
      }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        post api_v1_quiz_worktree_files_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_worktree_file_name"]).to eq("ファイル名")
        expect(res["data"][0]["quiz_worktree_file_text_status"]).to eq("こんにちは")
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        post api_v1_quiz_worktree_files_path, params: mulch_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_worktree_file_name"]).to eq("ファイル名")
        expect(res["data"][1]["quiz_worktree_file_name"]).to eq("ファイル名2")
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /update" do
    let!(:update) do
      {
        quiz_worktree_file: {
          quiz_worktree_file_name: worktree_file2.quiz_worktree_file_name,
          quiz_worktree_file_text_status: worktree_file2.quiz_worktree_file_text_status,
          quiz_branch_id: worktree_file.quiz_branch_id,
        },
      }
    end

    it "データ更新が成功すること" do
      patch api_v1_quiz_worktree_file_path(worktree_file.id), params: update
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_worktree_file_name"]).to eq(worktree_file2.quiz_worktree_file_name)
      expect(res["data"]["quiz_worktree_file_text_status"]).to eq(worktree_file2.quiz_worktree_file_text_status)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "データ削除が成功すること" do
      delete api_v1_quiz_worktree_file_path(worktree_file.id)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to include("Deleted the post")
      expect(response).to have_http_status(200)
    end
  end
end
