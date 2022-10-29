require 'rails_helper'

RSpec.describe QuizHistoryOfCommittedFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:quiz_history_of_committed_file) { create(:quiz_history_of_committed_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(quiz_history_of_committed_file).to be_valid
      end
    end

    context "quiz_history_of_committed_file_nameの値が入力されていない場合" do
      let(:quiz_history_of_committed_file) { build(:quiz_history_of_committed_file, quiz_history_of_committed_file_name: nil) }

      it "エラーになること" do
        quiz_history_of_committed_file.valid?
        expect(quiz_history_of_committed_file.errors.messages[:quiz_history_of_committed_file_name]).to include "can't be blank"
      end
    end

    context "quiz_history_of_committed_file_statusの値が入力されていない場合" do
      let(:quiz_history_of_committed_file) { build(:quiz_history_of_committed_file, quiz_history_of_committed_file_status: nil) }

      it "エラーになること" do
        quiz_history_of_committed_file.valid?
        expect(quiz_history_of_committed_file.errors.messages[:quiz_history_of_committed_file_status]).to include "can't be blank"
      end
    end
  end
end
