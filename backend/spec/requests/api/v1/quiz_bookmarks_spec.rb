require 'rails_helper'

RSpec.describe "Api::V1::QuizBookmarks", type: :request do
  let!(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz2) { create(:quiz) }
  let!(:quiz_bookmark) { create(:quiz_bookmark, user: user, quiz: quiz2) }
  let!(:quiz_bookmark2) { create(:quiz_bookmark) }
  let(:param) do
    {
      quiz_bookmark: {
        user_id: user.id,
        quiz_id: quiz.id,
      },
    }
  end
  let(:bad_param) do
    {
      quiz_bookmark: {
        user_id: user.id,
        quiz_id: quiz2.id,
      },
    }
  end

  describe "GET /index" do
    before do
      get api_v1_quiz_bookmarks_path
    end

    it "全てのquiz_bookmarkデータを取得できていること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded quiz bookmarks")
      expect(res["data"][0]["id"]).to eq(quiz_bookmark.id)
      expect(res["data"][1]["id"]).to eq(quiz_bookmark2.id)
      expect(QuizBookmark.count).to eq 2
      expect(res["data"].count).to eq 2
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end

  describe "POST /create" do
    context "同じ値のquiz_bookmarkがDB内に存在しない場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_bookmarks_path, params: param
        end.to change(QuizBookmark, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["user_id"]).to eq(user.id)
        expect(res["data"]["quiz_id"]).to eq(quiz.id)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_bookmarks_path, params: param
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end

    context "既に同じ値のquiz_bookmarkがDB内に存在する場合" do
      it "データ登録が失敗すること" do
        post api_v1_quiz_bookmarks_path, params: bad_param
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["messaeg"]).to eq("既に解答済みのデータは存在しています。")
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_bookmarks_path, params: bad_param
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_bookmarkデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_bookmark_path(quiz_bookmark.id)
      end.to change(QuizBookmark, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the quiz bookmark")
      expect(res["data"]["id"]).to eq(quiz_bookmark.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が2つであること" do
      delete api_v1_quiz_bookmark_path(quiz_bookmark.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
