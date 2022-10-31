require 'rails_helper'

RSpec.describe QuizWorktreeFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:worktree_file) { create(:quiz_worktree_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(worktree_file).to be_valid
      end
    end

    context "quiz_worktree_file_nameの値が入力されていない場合" do
      let(:worktree_file) { build(:quiz_worktree_file, quiz_worktree_file_name: nil) }

      it "エラーになること" do
        worktree_file.valid?
        expect(worktree_file.errors.messages[:quiz_worktree_file_name]).to include "can't be blank"
      end
    end

    context "quiz_worktree_file_text_statusの値が入力されていない場合" do
      let(:worktree_file) { build(:quiz_worktree_file, quiz_worktree_file_text_status: nil) }

      it "エラーになること" do
        worktree_file.valid?
        expect(worktree_file.errors.messages[:quiz_worktree_file_text_status]).to include "can't be blank"
      end
    end
  end
end
