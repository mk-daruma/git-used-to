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
end
