require 'rails_helper'

RSpec.describe QuizFirstOrLast, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全ての値が入力され、quiz_introductionの文字数が30文字の場合" do
      let(:quiz_first_or_last) { create(:quiz_first_or_last) }

      it "quizのレコード作成が成功すること" do
        expect(quiz_first_or_last).to be_valid
      end
    end

    context "quiz_first_or_last_statusの値が入力されていない場合" do
      let(:quiz_first_or_last) { build(:quiz_first_or_last, quiz_first_or_last_status: nil) }

      it "エラーになること" do
        quiz_first_or_last.valid?
        expect(err_message(quiz_first_or_last, :quiz_first_or_last_status)).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quizのデータが削除された場合" do
      let(:quiz_first_or_last) { create(:quiz_first_or_last) }
      let!(:branch) { create(:quiz_branch, quiz_first_or_last: quiz_first_or_last) }
      let!(:remote_branch) { create(:quiz_remote_branch, quiz_first_or_last: quiz_first_or_last) }

      it "quizに紐づいているquiz_first_or_lastのデータも削除されること" do
        expect do
          quiz_first_or_last.destroy
        end.to change(QuizRemoteBranch, :count).by(-1).and change(QuizBranch, :count).by(-1)
      end
    end
  end

  describe "quiz_first_or_lasts_count_must_be_within_limit" do
    context "同じquizデータに紐づいたquiz_first_or_lastのデータが二つ存在する場合" do
      let!(:quiz) { create(:quiz) }
      let!(:quiz_first_or_last1) { create(:quiz_first_or_last, quiz: quiz) }
      let!(:quiz_first_or_last2) { create(:quiz_first_or_last, quiz: quiz) }
      let(:new_quiz_first_or_last) { build(:quiz_first_or_last, quiz: quiz) }

      it "エラーが出ること" do
        expect do
          new_quiz_first_or_last.save
        end.to change(QuizFirstOrLast, :count).by(0)
        expect(err_message(new_quiz_first_or_last, :base)).to include "quiz_first_or_lasts count limit: 2"
      end
    end
  end
end
