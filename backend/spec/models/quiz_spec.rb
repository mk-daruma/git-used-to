require 'rails_helper'

RSpec.describe Quiz, type: :model do
  def fake_alphanumeric(num)
    Faker::Alphanumeric.alpha(number: num)
  end

  def err_message(karam)
    quiz.errors.messages[karam]
  end

  describe "validates presence" do
    context "全ての値が入力され、quiz_introductionの文字数が30文字の場合" do
      let(:quiz) { create(:quiz) }

      it "quizのレコード作成が成功すること" do
        expect(quiz).to be_valid
      end
    end

    context "全ての値が入力され、quiz_introductionの文字数が30文字未満の場合" do
      let(:quiz) { build(:quiz, quiz_introduction: fake_alphanumeric(29)) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "is too short (minimum is 30 characters)"
      end
    end

    context "全ての値が入力され、quiz_introductionの文字数が201文以上の場合" do
      let(:quiz) { build(:quiz, quiz_introduction: fake_alphanumeric(201)) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "is too long (maximum is 200 characters)"
      end
    end

    context "quiz_titleのみ値が入力されていない場合" do
      let(:quiz) { build(:quiz, quiz_title: nil) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_title)).to include "can't be blank"
      end
    end

    context "quiz_introductionのみ値が入力されていない場合" do
      let(:quiz) { build(:quiz, quiz_introduction: nil) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quizのデータが削除された場合" do
      let(:quiz) { create(:quiz) }
      let!(:quiz_first_or_last) { create(:quiz_first_or_last, quiz: quiz) }
      let!(:quiz_answer_record) { create(:quiz_answer_record, quiz: quiz) }

      it "quizに紐づいているquiz_first_or_last/quiz_answer_recordのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizFirstOrLast, :count).by(-1)
      end

      it "quizに紐づいているquiz_answer_recordのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizAnswerRecord, :count).by(-1)
      end
    end
  end
end
