require 'rails_helper'

RSpec.describe QuizBranch, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:quiz_branch) { create(:quiz_branch) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(quiz_branch).to be_valid
      end
    end

    context "quiz_branch_nameの値が入力されていない場合" do
      let(:quiz_branch) { build(:quiz_branch, quiz_branch_name: nil) }

      it "エラーになること" do
        quiz_branch.valid?
        expect(quiz_branch.errors.messages[:quiz_branch_name]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_branchのデータが削除された場合" do
      let(:quiz_branch) { create(:quiz_branch) }
      let!(:quiz_worktree_file) { create(:quiz_worktree_file, quiz_branch:quiz_branch) }
      let!(:quiz_index_file) { create(:quiz_index_file, quiz_branch:quiz_branch) }
      let!(:quiz_commit_message) { create(:quiz_commit_message, quiz_branch:quiz_branch) }
      let!(:quiz_history_of_committed_file) { create(:quiz_history_of_committed_file, quiz_branch:quiz_branch) }
      let!(:quiz_repository_file) { create(:quiz_repository_file, quiz_branch:quiz_branch) }

      it "quiz_branchに紐づいている4つの異なるテーブルのデータも削除されること" do
        expect do
          quiz_branch.destroy
        end.to change(QuizWorktreeFile, :count).by(-1).and change(QuizIndexFile, :count).by(-1).and change(QuizCommitMessage, :count).by(-1).and change(QuizHistoryOfCommittedFile, :count).by(-1).and change(QuizRepositoryFile, :count).by(-1)
      end
    end
  end
end
