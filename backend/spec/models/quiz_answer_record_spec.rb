require 'rails_helper'

RSpec.describe QuizAnswerRecord, type: :model do
  let!(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz_answer_record) { create(:quiz_answer_record, user: user, quiz: quiz) }

  describe "validates presence" do
    context "同じ値のquiz_answer_recordのデータが存在しない場合" do
      it "quizのレコード作成が成功すること" do
        expect(quiz_answer_record).to be_valid
      end
    end

    context "既に同じ値のquiz_answer_recordのデータが存在する場合" do
      let(:quiz_answer_record2) { build(:quiz_answer_record, user: user, quiz: quiz) }

      it "エラーになること" do
        quiz_answer_record2.valid?
        expect(quiz_answer_record2.errors.messages[:quiz_id]).to include "has already been taken"
      end
    end
  end
end
