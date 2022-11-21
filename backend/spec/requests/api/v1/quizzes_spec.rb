require 'rails_helper'
require "date"

RSpec.describe "Api::V1::Quizzes", type: :request do
  let(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz2) { create(:quiz) }
  let!(:quiz_first_or_last) { create(:quiz_first_or_last, quiz: quiz) }
  let!(:quiz_first_or_last2) { create(:quiz_first_or_last, quiz: quiz) }
  let!(:quiz_first_or_last3) { create(:quiz_first_or_last, quiz: quiz2) }
  let!(:quiz_first_or_last4) { create(:quiz_first_or_last, quiz: quiz2) }
  let(:param) do
    {
      quiz: {
        user_id: user.id,
        quiz_title: "作成確認用",
        quiz_introduction: "これはcureateでデータが保存できるか確認するための値です",
        quiz_type: "user",
      },
    }
  end
  let(:update) do
    {
      quiz: {
        user_id: user.id,
        quiz_title: quiz2.quiz_title,
        quiz_introduction: quiz2.quiz_introduction,
        quiz_type: quiz.quiz_type,
      },
    }
  end

  describe "GET /index" do
    before do
      get api_v1_quizzes_path
    end

    it "全てのquizデータを取得できていること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded quizzes")
      expect(res["data"][0]["id"]).to eq(quiz.id)
      expect(res["data"][1]["id"]).to eq(quiz2.id)
      expect(Quiz.count).to eq 2
      expect(res["data"].count).to eq 2
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が2つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end

  describe "POST /create" do
    it "quizデータ作成が成功すること" do
      expect { post api_v1_quizzes_path, params: param }.to change(Quiz, :count).by(+1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_title"]).to eq("作成確認用")
      expect(res["data"]["quiz_introduction"]).to eq("これはcureateでデータが保存できるか確認するための値です")
      expect(res["data"]["quiz_type"]).to eq("user")
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が2つであること" do
      post api_v1_quizzes_path, params: param
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
    end
  end

  describe "GET /show" do
    context "引数がquizのidの場合" do
      before do
        get api_v1_quiz_path(quiz.id)
      end

      it "quizに紐づいたquiz_first_or_lastsのデータのみを取得すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        expect(res["quiz_data"]["id"]).to eq(quiz.id)
        expect(res["quiz_data"]["id"]).not_to eq(quiz2.id)
        expect(res["quiz_first_or_lasts_data"][0]["id"]).to eq(quiz_first_or_last.id)
        expect(res["quiz_first_or_lasts_data"][1]["id"]).to eq(quiz_first_or_last2.id)
        expect(res["quiz_first_or_lasts_data"][0]["id"]).not_to eq(quiz_first_or_last3.id)
        expect(res["quiz_first_or_lasts_data"][1]["id"]).not_to eq(quiz_first_or_last4.id)
        expect(res["quiz_first_or_lasts_data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が4つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 4
      end
    end
  end

  describe "PATCH /update" do
    before do
      patch api_v1_quiz_path(quiz.id), params: update
    end

    it "quizデータの更新が成功すること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["data"]["quiz_title"]).to eq(quiz2.quiz_title)
      expect(res["data"]["quiz_introduction"]).to eq(quiz2.quiz_introduction)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が2つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
    end
  end

  describe "delete /destroy" do
    it "quizデータの削除が成功すること" do
      expect { delete api_v1_quiz_path(quiz.id) }.to change(Quiz, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(quiz.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_path(quiz.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end

  describe "GET /tag" do
    let!(:quiz_tag) { create(:quiz_tag, quiz: quiz) }

    before do
      get tag_api_v1_quiz_path(quiz.id)
    end

    context "引数がquizのidの場合" do
      it "quizに紐づいたquiz_tagのデータのみを取得すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quiz tags")
        expect(res["quiz_tags_data"][0]["id"]).to eq(quiz_tag.id)
        expect(res["quiz_tags_data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が3つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 3
      end
    end
  end

  describe "GET /weekly_ranking" do
    date = Time.current
    let!(:not_rank_in_user) { create(:user) }
    let!(:a_week_ago_quiz) { create(:quiz, quiz_type: "old", created_at: date.prev_week, user: not_rank_in_user) }
    let!(:rank_in_quiz) { create(:quiz, created_at: date, user: user) }
    let!(:rank_in_quiz2) { create(:quiz, created_at: date, user: user) }
    let!(:rank_in_quiz3) { create(:quiz, created_at: date, user: user) }
    let!(:shortage_bookmarks_quiz) { create(:quiz, quiz_type: "old", created_at: date, user: not_rank_in_user) }
    let!(:a_week_ago_quiz_bookmarks) { create_list(:quiz_bookmark, 3, quiz: a_week_ago_quiz) }
    let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 3, quiz: rank_in_quiz) }
    let!(:quiz2_bookmarks) { create_list(:quiz_bookmark, 3, quiz: rank_in_quiz2) }
    let!(:quiz3_bookmarks) { create_list(:quiz_bookmark, 3, quiz: rank_in_quiz3) }
    let!(:shortage_bookmarks_quiz_bookmarks) { create_list(:quiz_bookmark, 2, quiz: shortage_bookmarks_quiz) }
    let!(:rank_in_quizzes) { [rank_in_quiz, rank_in_quiz2, rank_in_quiz3] }

    before do
      get weekly_ranking_api_v1_quizzes_path
    end

    it "通信が成功すること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded quiz weekly ranking")
      expect(response).to have_http_status(:success)
    end

    it "直近１週間で作成されたクイズ/関連するブックマーク数/作成したuserのデータのみが取得できること" do
      res = JSON.parse(response.body)
      rank_in_quizzes.each_with_index do |quiz, i|
        expect(res["rank_in_quiz_data"][i]["rank_in_quiz_data"]["id"]).to eq(quiz.id)
        expect(res["rank_in_quiz_data"][i]["rank_in_quiz_data"]["user_id"]).to eq(quiz.user_id)
        expect(res["rank_in_quiz_data"][i]["rank_in_quiz_data"]["quiz_title"]).to eq(quiz.quiz_title)
        expect(res["rank_in_quiz_data"][i]["rank_in_quiz_data"]["quiz_introduction"]).to eq(quiz.quiz_introduction)
        expect(res["rank_in_quiz_data"][i]["rank_in_quiz_data"]["quiz_type"]).to eq(quiz.quiz_type)
        expect(res["rank_in_quiz_data"][i]["create_user_name"]).to eq(user.user_name)
        expect(res["rank_in_quiz_data"][i]["create_user_image"]).to eq(user.image.url)
        expect(res["rank_in_quiz_data"][i]["bookmark_count"]).to eq(3)
      end
      expect(res["rank_in_quiz_data"].length).to eq(3)
    end

    it "直近１週間より前に作成されたクイズデータと関連するブックマーク数は取得されないこと" do
      res = JSON.parse(response.body)
      res["rank_in_quiz_data"].each do |quiz_data|
        expect(quiz_data["rank_in_quiz_data"]["id"]).not_to eq(a_week_ago_quiz.id)
        expect(quiz_data["rank_in_quiz_data"]["user_id"]).not_to eq(a_week_ago_quiz.user_id)
        expect(quiz_data["rank_in_quiz_data"]["quiz_title"]).not_to eq(a_week_ago_quiz.quiz_title)
        expect(quiz_data["rank_in_quiz_data"]["quiz_introduction"]).not_to eq(a_week_ago_quiz.quiz_introduction)
        expect(quiz_data["rank_in_quiz_data"]["quiz_type"]).not_to eq(a_week_ago_quiz.quiz_type)
        expect(quiz_data["create_user_name"]).not_to eq(not_rank_in_user.user_name)
        expect(quiz_data["create_user_image"]).not_to eq(not_rank_in_user.image.url)
      end
    end

    it "bookmark数が3つ未満のクイズ/関連するブックマーク数/作成したuserのデータが取得されないこと" do
      res = JSON.parse(response.body)
      res["rank_in_quiz_data"].each do |quiz_data|
        expect(quiz_data["rank_in_quiz_data"]["id"]).not_to eq(shortage_bookmarks_quiz.id)
        expect(quiz_data["rank_in_quiz_data"]["user_id"]).not_to eq(shortage_bookmarks_quiz.user_id)
        expect(quiz_data["rank_in_quiz_data"]["quiz_title"]).not_to eq(shortage_bookmarks_quiz.quiz_title)
        expect(quiz_data["rank_in_quiz_data"]["quiz_introduction"]).not_to eq(shortage_bookmarks_quiz.quiz_introduction)
        expect(quiz_data["rank_in_quiz_data"]["quiz_type"]).not_to eq(shortage_bookmarks_quiz.quiz_type)
        expect(quiz_data["create_user_name"]).not_to eq(not_rank_in_user.user_name)
        expect(quiz_data["create_user_image"]).not_to eq(not_rank_in_user.image.url)
      end
    end

    it "取得するdataの要素が3つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
