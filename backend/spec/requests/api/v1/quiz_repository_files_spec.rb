require 'rails_helper'

RSpec.describe "Api::V1::QuizRepositoryFiles", type: :request do
  let!(:repository_file) { create(:quiz_repository_file) }

  describe "POST /create" do
    let!(:branch) { create(:quiz_branch) }
    let!(:commit_message) { create(:quiz_commit_message) }
    let(:params) do
      {
        _json: [
          {
            quiz_repository_file_name: "新規作成",
            quiz_repository_file_status: "おはようございます",
            quiz_repository_file_text_status: "こんにちは",
            quiz_branch_id: branch.id,
            quiz_commit_message_id: commit_message.id,
          },
        ],
      }
    end
    let(:mulch_params) do
      {
        _json: [
          {
            quiz_repository_file_name: "複数作成確認用1",
            quiz_repository_file_status: "おはようございます",
            quiz_repository_file_text_status: "こんにちは",
            quiz_branch_id: branch.id,
            quiz_commit_message_id: commit_message.id,
          },
          {
            quiz_repository_file_name: "複数作成確認用2",
            quiz_repository_file_status: "おはようございます",
            quiz_repository_file_text_status: "こんにちは",
            quiz_branch_id: branch.id,
            quiz_commit_message_id: commit_message.id,
          },
        ],
      }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_repository_files_path, params: params
        end.to change(QuizRepositoryFile, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_repository_file_name"]).to eq("新規作成")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_repository_files_path, params: params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_repository_files_path, params: mulch_params
        end.to change(QuizRepositoryFile, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_repository_file_name"]).to eq("複数作成確認用1")
        expect(res["data"][1]["quiz_repository_file_name"]).to eq("複数作成確認用2")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_repository_files_path, params: mulch_params
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_repository_fileデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_repository_file_path(repository_file.id)
      end.to change(QuizRepositoryFile, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(repository_file.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_repository_file_path(repository_file.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
