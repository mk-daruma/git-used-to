require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let!(:image_path) { File.join(Rails.root, 'spec/fixtures/images/sample2.jpeg') }
  let!(:image) { Rack::Test::UploadedFile.new(image_path) }

  describe "GET /index" do
    let!(:users) { create_list(:user, 5) }

    before do
      get api_v1_users_path
    end

    it "全てのuser_id/user_name/image_urlのデータを取得できていること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Loaded users")
      users.each_with_index do |user, i|
        expect(res["data"][i]["id"]).to eq(user.id)
        expect(res["data"][i]["user_name"]).to eq(user.user_name)
        expect(res["data"][i]["image"]["url"]).to eq(user.image.url)
      end
      expect(User.count).to eq 5
      expect(res["data"].count).to eq 5
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end

  describe "GET /api/v1/users#show" do
    let!(:user) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:user_quiz1) { create(:quiz, user: user) }
    let!(:user_quiz2) { create(:quiz, user: user) }
    let!(:user2_quiz1) { create(:quiz, user: user2) }
    let!(:user2_quiz2) { create(:quiz, user: user2) }
    let!(:related_quiz_comment) { create(:quiz_comment, quiz: user_quiz1) }
    let!(:related_quiz_comment2) { create(:quiz_comment, quiz: user_quiz1, user: user2) }
    let!(:not_related_quiz_comment) { create(:quiz_comment, quiz: user2_quiz1, user: user2) }
    let!(:related_quiz_tag) { create(:quiz_tag, quiz: user_quiz1) }
    let!(:not_related_quiz_tag) { create(:quiz_comment, quiz: user2_quiz1) }
    let!(:related_quiz_answer_record) { create(:quiz_answer_record, user: user, quiz: user2_quiz1) }
    let!(:not_related_quiz_answer_record) { create(:quiz_answer_record) }

    context "引数がquizのidの場合" do
      before do
        get api_v1_user_path(user.id)
      end

      it "通信が成功すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        expect(response).to have_http_status(:success)
      end

      it "userの関連しているquizデータのみを取得できること" do
        res = JSON.parse(response.body)
        expect(res["data"][0]["id"]).to eq(user_quiz1.id)
        expect(res["data"][1]["id"]).to eq(user_quiz2.id)
        expect(res["data"][0]["id"]).not_to eq(user2_quiz1.id)
        expect(res["data"][1]["id"]).not_to eq(user2_quiz2.id)
        expect(res["data"].length).to eq 2
      end

      it "userの関連しているquiz_answer_recordデータのみを取得できること" do
        res = JSON.parse(response.body)
        expect(res["data_answer_records"][0]["id"]).to eq(related_quiz_answer_record.id)
        expect(res["data_answer_records"].length).to eq 1
      end

      it "userが作成したquizデータに関連しているcommentのみを取得できること" do
        res = JSON.parse(response.body)
        expect(res["data_comments"][0]["id"]).to eq(related_quiz_comment.id)
        expect(res["data_comments"][1]["id"]).to eq(related_quiz_comment2.id)
        expect(res["data_comments"].length).to eq 2
      end

      it "userが作成したquizデータに関連しているtagのみを取得できること" do
        res = JSON.parse(response.body)
        expect(res["data_tags"][0]["id"]).to eq(related_quiz_tag.id)
        expect(res["data_tags"].length).to eq 1
      end

      it "取得するdataの要素が6つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 6
      end
    end
  end

  describe "PUT /api/v1/users#update" do
    let!(:user) { create(:user, user_self_introduction: "こんにちは") }
    let!(:user2) { create(:user, user_self_introduction: "こんばんわ", image: image) }
    let(:params) do
      {
        user_name: user2.user_name,
        user_self_introduction: user2.user_self_introduction,
        image: image,
      }
    end

    it "userデータの編集が成功すること" do
      expect(user.image.url.split("/").last).not_to eq(user2.image.url.split("/").last)
      put api_v1_user_path(user.id), params: params
      res = JSON.parse(response.body)
      expect(res["status"]).to eq(200)
      expect(res["data"]["user_name"]).to eq(user2.user_name)
      expect(res["data"]["user_self_introduction"]).to eq(user2.user_self_introduction)
      expect(res["data"]["image"]["url"].split("/").last).to eq(user2.image.url.split("/").last)
      expect(response).to have_http_status(200)
    end

    it "取得するdataの要素が2つであること" do
      put api_v1_user_path(user.id), params: params
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
    end
  end

  describe "GET /api/v1/users#profile" do
    let!(:user) { create(:user) }
    let!(:related_quizzes) { create_list(:quiz, 5, user: user) }
    let!(:no_related_quiz) { create(:quiz) }
    let!(:related_quiz_answer_records) { create_list(:quiz_answer_record, 5, user: user) }
    let!(:no_related_quiz_answer_record) { create(:quiz_answer_record) }
    let!(:related_quiz_comments) { create_list(:quiz_comment, 5, user: user) }
    let!(:no_related_quiz_comment) { create(:quiz_comment) }

    context "引数がuserのidの場合" do
      before do
        get profile_api_v1_user_path(user.id)
      end

      it "通信が成功すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded user info")
        expect(response).to have_http_status(:success)
      end

      it "userデータを取得できること" do
        res = JSON.parse(response.body)
        expect(res["user_data"]["id"]).to eq(user.id)
      end

      it "userに関連するquizデータ数を取得できること" do
        res = JSON.parse(response.body)
        expect(res["quizzes_length"]).to eq(5)
      end

      it "userに関連するquiz_answer_recordデータ数を取得できること" do
        res = JSON.parse(response.body)
        expect(res["quiz_answer_records_length"]).to eq(5)
      end

      it "userに関連するquiz_commentデータ数を取得できること" do
        res = JSON.parse(response.body)
        expect(res["quiz_comments_length"]).to eq(5)
      end

      it "取得するdataの要素が6つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 6
      end
    end
  end

  describe "GET /api/v1/users#self_bookmarked" do
    let!(:user) { create(:user) }
    let!(:bookmarked_quiz) { create(:quiz) }
    let!(:bookmarked_quiz2) { create(:quiz) }
    let!(:not_bookmarked_quiz) { create(:quiz) }
    let!(:user_related_bookmark) { create(:quiz_bookmark, quiz: bookmarked_quiz, user: user) }
    let!(:user_related_bookmark2) { create(:quiz_bookmark, quiz: bookmarked_quiz2, user: user) }
    let!(:user_created_quiz_related_bookmarks) { create_list(:quiz_bookmark, 5, quiz: bookmarked_quiz) }
    let!(:not_related_bookmark) { create(:quiz_bookmark, quiz: not_bookmarked_quiz) }
    let!(:user_created_quiz_related_comments) { create_list(:quiz_comment, 5, quiz: bookmarked_quiz) }
    let!(:not_related_comment) { create(:quiz_comment, quiz: not_bookmarked_quiz) }
    let!(:user_created_quiz_related_tags) { create_list(:quiz_tag, 5, quiz: bookmarked_quiz) }
    let!(:not_related_tag) { create(:quiz_tag, quiz: not_bookmarked_quiz) }

    before do
      get self_bookmarked_api_v1_user_path(user.id)
    end

    it "通信が成功すること" do
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(response).to have_http_status(:success)
    end

    it "userがブックマークしたクイズのデータが取得できること" do
      res = JSON.parse(response.body)
      expect(res["self_bookmarked_quizzes"][0]["id"]).to eq(bookmarked_quiz.id)
      expect(res["self_bookmarked_quizzes"][1]["id"]).to eq(bookmarked_quiz2.id)
      expect(res["self_bookmarked_quizzes"].length).to eq(2)
    end

    it "userがブックマークしていないクイズのデータが取得されないこと" do
      res = JSON.parse(response.body)
      res["self_bookmarked_quizzes"].each do |self_bookmarked_quizzes|
        expect(self_bookmarked_quizzes["id"]).not_to eq(not_bookmarked_quiz.id)
      end
    end

    it "userがブックマークしたクイズと関連しているブックマークのデータを取得できること" do
      res = JSON.parse(response.body)
      expect(res["self_bookmarked_quiz_bookmarks"][0]["id"]).to eq(user_related_bookmark.id)
      user_created_quiz_related_bookmarks.each_with_index do |user_created_quiz_related_bookmark, i|
        expect(res["self_bookmarked_quiz_bookmarks"][i + 1]["id"]).to eq(user_created_quiz_related_bookmark.id)
      end
      expect(res["self_bookmarked_quiz_bookmarks"][6]["id"]).to eq(user_related_bookmark2.id)
    end

    it "userがブックマークしていないクイズのブックマークのデータが取得されないこと" do
      res = JSON.parse(response.body)
      res["self_bookmarked_quiz_bookmarks"].each do |self_bookmarked_quiz_bookmarks|
        expect(self_bookmarked_quiz_bookmarks["id"]).not_to eq(not_related_bookmark.id)
      end
    end

    it "userがブックマークしたクイズと関連しているコメントのデータが取得できること" do
      res = JSON.parse(response.body)
      user_created_quiz_related_comments.each_with_index do |user_created_quiz_related_comment, i|
        expect(res["self_bookmarked_quiz_comments"][i]["id"]).to eq(user_created_quiz_related_comment.id)
        expect(res["self_bookmarked_quiz_comments"][i]["id"]).not_to eq(not_related_comment.id)
      end
    end

    it "userがブックマークしていないクイズのコメントのデータが取得されないこと" do
      res = JSON.parse(response.body)
      res["self_bookmarked_quiz_comments"].each do |self_bookmarked_quiz_comments|
        expect(self_bookmarked_quiz_comments["id"]).not_to eq(not_related_comment.id)
      end
    end

    it "userがブックマークしたクイズと関連しているタグのデータが取得できること" do
      res = JSON.parse(response.body)
      user_created_quiz_related_tags.each_with_index do |user_created_quiz_related_tag, i|
        expect(res["self_bookmarked_quiz_tags"][i]["id"]).to eq(user_created_quiz_related_tag.id)
        expect(res["self_bookmarked_quiz_tags"][i]["id"]).not_to eq(not_related_tag.id)
      end
    end

    it "userがブックマークしていないクイズのタグのデータが取得されないこと" do
      res = JSON.parse(response.body)
      res["self_bookmarked_quiz_tags"].each do |self_bookmarked_quiz_tags|
        expect(self_bookmarked_quiz_tags["id"]).not_to eq(not_related_tag.id)
      end
    end

    it "取得するdataの要素が5つであること" do
      res = JSON.parse(response.body)
      expect(res.length).to eq 5
    end
  end
end
