require 'rails_helper'

RSpec.describe "Api::V1::QuizBranches", type: :request do
  let!(:first_or_last) { create(:quiz_first_or_last) }
  let!(:branch) { create(:quiz_branch, quiz_first_or_last: first_or_last) }
  let!(:branch2) { create(:quiz_branch) }

  describe "POST /create" do
    let(:params) do
      {
        _json: [
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_branch_name: "作成確認用",
          },
        ],
      }
    end
    let(:mulch_params) do
      {
        _json: [
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_branch_name: "複数作成確認用1",
          },
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_branch_name: "複数作成確認用2",
          },
        ],
      }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_branches_path, params: params
        end.to change(QuizBranch, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_branch_name"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_branches_path, params: mulch_params
        end.to change(QuizBranch, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_branch_name"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_branch_name"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /show" do
    let!(:related_worktree_files) { create_list(:quiz_worktree_file, 5, quiz_branch: branch) }
    let!(:not_related_worktree_file) { create(:quiz_worktree_file, quiz_branch: branch2) }
    let!(:related_index_files) { create_list(:quiz_index_file, 5, quiz_branch: branch) }
    let!(:not_related_index_file) { create(:quiz_index_file, quiz_branch: branch2) }
    let!(:related_commit_messages) { create_list(:quiz_commit_message, 5, quiz_branch: branch) }
    let!(:not_related_commit_message) { create(:quiz_commit_message, quiz_branch: branch2) }

    context "引数がquiz_branchのidの場合" do
      it "quiz_branchに紐づいたデータのみを取得すること" do
        get api_v1_quiz_branch_path(branch.id)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_worktree_files.each_with_index do |worktree_file, i|
          expect(res["data_worktree_files"][i]["id"]).to eq(worktree_file.id)
          expect(res["data_worktree_files"][i]["id"]).not_to eq(not_related_worktree_file.id)
        end
        related_index_files.each_with_index do |index_file, i|
          expect(res["data_index_files"][i]["id"]).to eq(index_file.id)
          expect(res["data_index_files"][i]["id"]).not_to eq(not_related_index_file.id)
        end
        related_commit_messages.each_with_index do |commit_message, i|
          expect(res["data_messages"][i]["id"]).to eq(commit_message.id)
          expect(res["data_messages"][i]["id"]).not_to eq(not_related_commit_message.id)
        end
        expect(res["data_worktree_files"].length).to eq 5
        expect(res["data_index_files"].length).to eq 5
        expect(res["data_messages"].length).to eq 5
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PATCH /update" do
    let(:update) do
      {
        quiz_branch: {
          quiz_first_or_last_id: first_or_last.id,
          quiz_branch_name: branch2.quiz_branch_name,
        },
      }
    end

    it "quiz_branchデータの更新が成功すること" do
      patch api_v1_quiz_branch_path(branch.id), params: update
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_branch_name"]).to eq(branch2.quiz_branch_name)
      expect(response).to have_http_status(:success)
    end
  end

  describe "delete /destroy" do
    it "quiz_branchデータの削除が成功すること" do
      expect { delete api_v1_quiz_branch_path(branch.id) }.to change(QuizBranch, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(branch.id)
      expect(response).to have_http_status(:success)
    end
  end
end
