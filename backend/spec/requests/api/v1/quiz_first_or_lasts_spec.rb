require 'rails_helper'

RSpec.describe "Api::V1::QuizFirstOrLasts", type: :request do
  let!(:quiz) { create(:quiz) }
  let!(:first_or_last) { create(:quiz_first_or_last) }
  let!(:first_or_last2) { create(:quiz_first_or_last) }
  let(:param) do
    {
      _json: [
        {
          quiz_first_or_last_status: "作成確認用",
          quiz_id: quiz.id,
        },
      ],
    }
  end
  let(:mulch_params) do
    {
      _json: [
        {
          quiz_first_or_last_status: "作成確認用2",
          quiz_id: quiz.id,
        },
        {
          quiz_first_or_last_status: "作成確認用3",
          quiz_id: quiz.id,
        },
      ],
    }
  end

  describe "POST /create" do
    context "送られてきた配列内の情報が一つの場合" do
      it "quiz_first_or_lastデータの作成が成功すること" do
        expect do
          post api_v1_quiz_first_or_lasts_path, params: param
        end.to change(QuizFirstOrLast, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_first_or_last_status"]).to eq("作成確認用")
        expect(res["data"].length).to eq 1
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が2つであること" do
        post api_v1_quiz_first_or_lasts_path, params: param
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
      end
    end

    context "送られてきた配列内の情報が2つの場合" do
      it "quiz_first_or_lastデータの作成が成功すること" do
        expect do
          post api_v1_quiz_first_or_lasts_path, params: mulch_params
        end.to change(QuizFirstOrLast, :count).by(+2)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"][0]["quiz_first_or_last_status"]).to eq("作成確認用2")
        expect(res["data"][1]["quiz_first_or_last_status"]).to eq("作成確認用3")
        expect(res["data"].length).to eq 2
        expect(response).to have_http_status(:success)
      end
    end

    it "取得するdataの要素が2つであること" do
      post api_v1_quiz_first_or_lasts_path, params: mulch_params
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
    end
  end

  describe "GET /show" do
    let!(:related_branchs) do
      create_list(:quiz_branch, 3, quiz_first_or_last: first_or_last)
    end
    let!(:not_related_branch) do
      create(:quiz_branch, quiz_first_or_last: first_or_last2)
    end
    let!(:related_remote_branches) do
      create_list(:quiz_remote_branch, 3, quiz_first_or_last: first_or_last)
    end
    let!(:not_related_remote_branch) do
      create(:quiz_remote_branch, quiz_first_or_last: first_or_last2)
    end

    context "引数がquiz_first_or_lastのidの場合" do
      before do
        get api_v1_quiz_first_or_last_path(first_or_last.id)
      end

      it "quiz_first_or_lastに紐づいたデータのみを取得すること" do
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["message"]).to eq("Loaded quizzes")
        related_branchs.each_with_index do |quiz_branch, i|
          expect(res["data_branches"][i]["id"]).to eq(quiz_branch.id)
          expect(res["data_branches"][i]["id"]).not_to eq(not_related_branch.id)
        end
        related_remote_branches.each_with_index do |quiz_remote_branch, i|
          expect(res["data_remote_branches"][i]["id"]).to eq(quiz_remote_branch.id)
          expect(res["data_remote_branches"][i]["id"]).not_to eq(not_related_remote_branch.id)
        end
        expect(res["data_branches"].length).to eq 3
        expect(res["data_remote_branches"].length).to eq 3
        expect(response).to have_http_status(:success)
      end

      it "取得するdataの要素が4つであること" do
        res = JSON.parse(response.body)
        expect(res.length).to eq 4
      end
    end
  end

  describe "delete /destroy" do
    it "quiz_first_or_lastデータの削除が成功すること" do
      expect do
        delete api_v1_quiz_first_or_last_path(first_or_last.id)
      end.to change(QuizFirstOrLast, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("SUCCESS")
      expect(res["message"]).to eq("Deleted the post")
      expect(res["data"]["id"]).to eq(first_or_last.id)
      expect(response).to have_http_status(:success)
    end

    it "取得するdataの要素が3つであること" do
      delete api_v1_quiz_first_or_last_path(first_or_last.id)
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
    end
  end
end
