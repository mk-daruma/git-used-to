require 'rails_helper'

RSpec.describe QuizTag, type: :model do
  def err_message(karam)
    quiz_tag.errors.messages[karam]
  end

  describe "validates presence" do
    context "tagが空の場合" do
      let(:quiz_tag) { build(:quiz_tag, tag: "") }

      it "エラーになること" do
        quiz_tag.valid?
        expect(err_message(:tag)).to include "can't be blank"
      end
    end
  end
end
