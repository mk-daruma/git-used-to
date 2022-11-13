require 'rails_helper'

RSpec.describe QuizComment, type: :model do
  def fake_alphanumeric(num)
    Faker::Alphanumeric.alpha(number: num)
  end

  def err_message(karam)
    quiz_comment.errors.messages[karam]
  end

  describe "validates presence" do
    context "commentが空の場合" do
      let(:quiz_comment) { build(:quiz_comment, comment: "") }

      it "エラーになること" do
        quiz_comment.valid?
        expect(err_message(:comment)).to include "is too short (minimum is 1 character)"
      end
    end

    context "commentの文字数が30文字未満の場合" do
      let(:quiz_comment) { build(:quiz_comment, comment: fake_alphanumeric(101)) }

      it "エラーになること" do
        quiz_comment.valid?
        expect(err_message(:comment)).to include "is too long (maximum is 100 characters)"
      end
    end
  end
end
