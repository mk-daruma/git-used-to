require 'rails_helper'

RSpec.describe QuizBranch, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:branch) { create(:quiz_branch) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(branch).to be_valid
      end
    end

    context "quiz_branch_nameの値が入力されていない場合" do
      let(:branch) { build(:quiz_branch, quiz_branch_name: nil) }

      it "エラーになること" do
        branch.valid?
        expect(branch.errors.messages[:quiz_branch_name]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_branchのデータが削除された場合" do
      let(:branch) { create(:quiz_branch) }
      let!(:related_worktree_file) { create(:quiz_worktree_file, quiz_branch: branch) }
      let!(:related_index_file) { create(:quiz_index_file, quiz_branch: branch) }
      let!(:related_commit_message) { create(:quiz_commit_message, quiz_branch: branch) }
      let!(:related_history_file) { create(:quiz_history_of_committed_file, quiz_branch: branch) }
      let!(:related_repository_file) { create(:quiz_repository_file, quiz_branch: branch) }

      it "quiz_branchに紐づいている4つの異なるテーブルのデータも削除されること" do
        expect do
          branch.destroy
        end.to change(QuizWorktreeFile, :count).by(-1).and change(QuizIndexFile, :count).by(-1).and change(QuizCommitMessage, :count).by(-1).and change(QuizHistoryOfCommittedFile, :count).by(-1).and change(QuizRepositoryFile, :count).by(-1) # rubocop:disable Style/LineLength
      end
    end
  end

  describe "quiz_branches_count_must_be_within_limit" do
    let!(:quiz_first_or_last) { create(:quiz_first_or_last) }

    context "同じquiz_first_or_lastデータに紐づいたquiz_branchのデータ数が3つ未満の場合" do
      let!(:branch) { create_list(:quiz_branch, 2, quiz_first_or_last: quiz_first_or_last) }
      let(:new_branch) { build(:quiz_branch, quiz_first_or_last: quiz_first_or_last) }

      it "新しいquiz_branchデータ作成が成功すること" do
        expect do
          new_branch.save
        end.to change(QuizBranch, :count).by(+1)
      end
    end

    context "同じquiz_first_or_lastデータに紐づいたquiz_branchのデータが既に3つ存在する場合" do
      let!(:branch) { create_list(:quiz_branch, 3, quiz_first_or_last: quiz_first_or_last) }
      let(:new_branch) { build(:quiz_branch, quiz_first_or_last: quiz_first_or_last) }

      it "新しいquiz_branchデータ作成が失敗すること" do
        expect do
          new_branch.save
        end.to change(QuizBranch, :count).by(0)
        expect(err_message(new_branch, :base)).to include "quiz_branches count limit: 3"
      end
    end
  end
end
