require 'rails_helper'

RSpec.describe QuizBookmark, type: :model do
  let!(:user) { create(:user) }
  let!(:quiz) { create(:quiz) }
  let!(:quiz_bookmark) { create(:quiz_bookmark, user: user, quiz: quiz) }

  describe "validates presence" do
    context "同じ値のquiz_bookmarkのデータが存在しない場合" do
      it "quiz_bookmarkのレコード作成が成功すること" do
        expect(quiz_bookmark).to be_valid
      end
    end

    context "既に同じ値のquiz_bookmarkのデータが存在する場合" do
      let(:quiz_bookmark2) { build(:quiz_bookmark, user: user, quiz: quiz) }

      it "エラーになること" do
        quiz_bookmark2.valid?
        expect(quiz_bookmark2.errors.messages[:quiz_id]).to include "has already been taken"
      end
    end
  end
end
