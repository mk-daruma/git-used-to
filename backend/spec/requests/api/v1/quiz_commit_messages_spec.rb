require 'rails_helper'

RSpec.describe "Api::V1::QuizCommitMessages", type: :request do
  let!(:branch) { create(:quiz_branch) }
  let!(:commit_message) { create(:quiz_commit_message) }

  describe "POST /create" do
    let(:params) do
      {
        _json: [
          {
            quiz_branch_id: branch.id,
            quiz_commit_message: "作成確認用",
          },
        ],
      }
    end
    let(:mulch_params) do
      {
        _json: [
          {
            quiz_branch_id: branch.id,
            quiz_commit_message: "複数作成確認用1",
          },
          {
            quiz_branch_id: branch.id,
            quiz_commit_message: "複数作成確認用2",
          },
        ],
      }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_commit_messages_path, params: params
        end.to change(QuizCommitMessage, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_commit_message"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_commit_messages_path, params: params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_commit_messages_path, params: mulch_params
        end.to change(QuizCommitMessage, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_commit_message"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_commit_message"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_commit_messages_path, params: mulch_params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end
  end

  describe "GET /show" do
    let!(:commit_message2) { create(:quiz_commit_message) }
    let!(:related_repository_files) do
      create_list(
        :quiz_repository_file,
        5,
        quiz_branch: branch,
        quiz_commit_message: commit_message,
      )
    end
    let!(:not_related_repository_file) do
      create(
        :quiz_repository_file,
        quiz_branch: branch,
        quiz_commit_message: commit_message2,
      )
    end
    let!(:related_history_files) do
      create_list(
        :quiz_history_of_committed_file,
        5,
        quiz_branch: branch,
        quiz_commit_message: commit_message,
      )
    end
    let!(:not_related_history_file) do
      create(
        :quiz_history_of_committed_file,
        quiz_branch: branch,
        quiz_commit_message: commit_message2,
      )
    end

    context "引数がquiz_commit_messageのidの場合" do
      before do
        get api_v1_quiz_commit_message_path(commit_message.id)
      end

      it "quiz_commit_messageに紐づいたデータのみを取得すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_repository_files.each_with_index do |repository_file, i|
          expect(res["data_repository_files"][i]["id"]).to eq(repository_file.id)
          expect(res["data_repository_files"][i]["id"]).not_to eq(not_related_repository_file.id)
        end
        related_history_files.each_with_index do |history_file, i|
          expect(res["data_history_of_committed_files"][i]["id"]).to eq(history_file.id)
          expect(res["data_history_of_committed_files"][i]["id"]).not_to eq(not_related_history_file.id)
        end
        expect(res["data_repository_files"].length).to eq 5
        expect(res["data_history_of_committed_files"].length).to eq 5
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が4つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 4
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_commit_messageデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_commit_message_path(commit_message.id)
      end.to change(QuizCommitMessage, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(commit_message.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_commit_message_path(commit_message.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
