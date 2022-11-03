require 'rails_helper'

RSpec.describe "Api::V1::QuizAnswerRecords", type: :request do
  let!(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz2) { create(:quiz) }
  let!(:quiz_answer_record) { create(:quiz_answer_record, user: user, quiz: quiz2) }
  let(:param) do
    {
      quiz_answer_record: {
        user_id: user.id,
        quiz_id: quiz.id,
      },
    }
  end
  let(:bad_param) do
    {
      quiz_answer_record: {
        user_id: user.id,
        quiz_id: quiz2.id,
      },
    }
  end

  describe "GET /create" do
    context "同じ値のquiz_answer_recordがDB内に存在しない場合" do
      it "データ登録が成功すること" do
        expect do
          post api_v1_quiz_answer_records_path, params: param
        end.to change(QuizAnswerRecord, :count).by(+1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["data"]["user_id"]).to eq(user.id)
        expect(res["data"]["quiz_id"]).to eq(quiz.id)
      end
    end

    context "既に同じ値のquiz_answer_recordがDB内に存在する場合" do
      it "データ登録が失敗すること" do
        post api_v1_quiz_answer_records_path, params: bad_param
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("SUCCESS")
        expect(res["messaeg"]).to eq("既に解答済みのデータは存在しています。")
      end
    end
  end
end
