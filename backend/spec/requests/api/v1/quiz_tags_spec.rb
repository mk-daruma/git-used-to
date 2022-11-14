require 'rails_helper'

RSpec.describe "Api::V1::QuizTags", type: :request do
  let!(:quiz) { create(:quiz) }
  let!(:quiz_tag) { create(:quiz_tag) }
  let(:param) do
    {
      quiz_tag: {
        quiz_id: quiz.id,
        tag: "作成確認用",
      },
    }
  end

  describe "GET /create" do
    it "データ登録が成功すること" do
      expect { post api_v1_quiz_tags_path, params: param }.to change(QuizTag, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_id"]).to eq(quiz.id)
      expect(res["data"]["tag"]).to eq("作成確認用")
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      post api_v1_quiz_tags_path, params: param
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
    end
  end

  describe "GET /destroy" do
    it "quiz_tagデータの削除が成功すること" do
      expect { delete api_v1_quiz_tag_path(quiz_tag.id) }.to change(QuizTag, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the quiz tag")
      expect(res["data"]["id"]).to eq(quiz_tag.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_tag_path(quiz_tag.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
