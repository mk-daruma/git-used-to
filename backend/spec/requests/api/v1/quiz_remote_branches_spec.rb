require 'rails_helper'

RSpec.describe "Api::V1::QuizRemoteBranches", type: :request do
  let!(:first_or_last) { create(:quiz_first_or_last) }
  let!(:remote_branch) { create(:quiz_remote_branch, quiz_first_or_last: first_or_last) }
  let!(:remote_branch2) { create(:quiz_remote_branch) }

  describe "POST /create" do
    let(:params) do
      {
        _json: [
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_remote_branch_name: "作成確認用",
          },
        ],
      }
    end
    let(:mulch_params) do
      {
        _json: [
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_remote_branch_name: "複数作成確認用1",
          },
          {
            quiz_first_or_last_id: first_or_last.id,
            quiz_remote_branch_name: "複数作成確認用2",
          },
        ],
      }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_remote_branches_path, params: params
        end.to change(QuizRemoteBranch, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_remote_branch_name"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_remote_branches_path, params: params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_remote_branches_path, params: mulch_params
        end.to change(QuizRemoteBranch, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_remote_branch_name"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_remote_branch_name"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_remote_branches_path, params: mulch_params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end
  end

  describe "GET /show" do
    let!(:related_commit_messages) do
      create_list(:quiz_remote_commit_message, 5, quiz_remote_branch: remote_branch)
    end
    let!(:not_related_commit_message) do
      create(:quiz_remote_commit_message, quiz_remote_branch: remote_branch2)
    end

    context "引数がquiz_remote_branchのidの場合" do
      before do
        get api_v1_quiz_remote_branch_path(remote_branch.id)
      end

      it "quiz_remote_branchに紐づいたデータのみを取得すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_commit_messages.each_with_index do |remote_commit_message, i|
          expect(res["data_remote_messages"][i]["id"]).to eq(remote_commit_message.id)
          expect(res["data_remote_messages"][i]["id"]).not_to eq(not_related_commit_message.id)
        end
        expect(res["data_remote_messages"].length).to eq 5
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が3つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 3
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_remote_branchデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_remote_branch_path(remote_branch.id)
      end.to change(QuizRemoteBranch, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(remote_branch.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_remote_branch_path(remote_branch.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
