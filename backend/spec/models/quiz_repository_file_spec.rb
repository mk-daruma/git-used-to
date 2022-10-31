require 'rails_helper'

RSpec.describe QuizRepositoryFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:repository_file) { create(:quiz_repository_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(repository_file).to be_valid
      end
    end

    context "quiz_repository_file_nameの値が入力されていない場合" do
      let(:repository_file) { build(:quiz_repository_file, quiz_repository_file_name: nil) }

      it "エラーになること" do
        repository_file.valid?
        expect(repository_file.errors.messages[:quiz_repository_file_name]).to include "can't be blank"
      end
    end

    context "quiz_repository_file_text_statusの値が入力されていない場合" do
      let(:repository_file) { build(:quiz_repository_file, quiz_repository_file_text_status: nil) }

      it "エラーになること" do
        repository_file.valid?
        expect(repository_file.errors.messages[:quiz_repository_file_text_status]).to include "can't be blank"
      end
    end
  end
end
