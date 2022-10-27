require 'rails_helper'

RSpec.describe "QuizIndexFiles", type: :request do
  let(:quiz_branch) { create(:quiz_branch) }
  let(:quiz_index_file) { create(:quiz_index_file) }
  let(:quiz_index_file2) { create(:quiz_index_file, quiz_index_file_text_status: "こんにちは") }

  describe "GET /create" do
    let(:params) do
      {
      _json: [{
        quiz_index_file_name: "ファイル名",
        quiz_index_file_text_status: "こんにちは",
        quiz_branch_id: quiz_branch.id
        }]
    }
    end
    let(:mulch_params) do
      {
      _json: [{
          quiz_index_file_name: "ファイル名",
          quiz_index_file_text_status: "こんにちは",
          quiz_branch_id: quiz_branch.id
        },
        {
          quiz_index_file_name: "ファイル名2",
          quiz_index_file_text_status: "おはようございます",
          quiz_branch_id: quiz_branch.id
        }]
    }
    end

    context "送られてきた配列内のファイル情報が一つの場合" do
      it "データ登録が成功すること" do
        post api_v1_quiz_index_files_path, params: params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_index_file_name"]).to eq("ファイル名")
        expect(res["data"][0]["quiz_index_file_text_status"]).to eq("こんにちは")
        expect(response).to have_http_status(:success)
      end
    end

    context "送られてきた配列内のファイル情報が複数の場合" do
      it "データ登録が成功すること" do
        post api_v1_quiz_index_files_path, params: mulch_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_index_file_name"]).to eq("ファイル名")
        expect(res["data"][1]["quiz_index_file_name"]).to eq("ファイル名2")
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /update" do
    let!(:update) do
      {
      quiz_index_file: {
        quiz_index_file_name: quiz_index_file2.quiz_index_file_name,
        quiz_index_file_text_status: quiz_index_file2.quiz_index_file_text_status,
        quiz_branch_id: quiz_index_file.quiz_branch_id
        }
    }
    end
    it "データ更新が成功すること" do
      patch api_v1_quiz_index_file_path(quiz_index_file.id), params: update
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_index_file_name"]).to eq(quiz_index_file2.quiz_index_file_name)
      expect(res["data"]["quiz_index_file_text_status"]).to eq(quiz_index_file2.quiz_index_file_text_status)
      expect(response).to have_http_status(:success)
    end
  end


  describe "GET /destroy" do
    it "データ削除が成功すること" do
      delete api_v1_quiz_index_file_path(quiz_index_file.id)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to include("Deleted the post")
      expect(response).to have_http_status(200)
    end
  end
end
