require 'rails_helper'

RSpec.describe QuizRemoteRepositoryFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:quiz_remote_repository_file) { create(:quiz_remote_repository_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(quiz_remote_repository_file).to be_valid
      end
    end

    context "quiz_remote_repository_file_nameの値が入力されていない場合" do
      let(:quiz_remote_repository_file) { build(:quiz_remote_repository_file, quiz_remote_repository_file_name: nil) }

      it "エラーになること" do
        quiz_remote_repository_file.valid?
        expect(quiz_remote_repository_file.errors.messages[:quiz_remote_repository_file_name]).to include "can't be blank"
      end
    end

    context "quiz_remote_repository_file_text_statusの値が入力されていない場合" do
      let(:quiz_remote_repository_file) { build(:quiz_remote_repository_file, quiz_remote_repository_file_text_status: nil) }

      it "エラーになること" do
        quiz_remote_repository_file.valid?
        expect(quiz_remote_repository_file.errors.messages[:quiz_remote_repository_file_text_status]).to include "can't be blank"
      end
    end
  end
end
