require 'rails_helper'

RSpec.describe QuizRemoteBranch, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:quiz_remote_branch) { create(:quiz_remote_branch) }

      it "quiz_remote_branchのレコード作成が成功すること" do
        expect(quiz_remote_branch).to be_valid
      end
    end

    context "quiz_remote_branch_nameの値が入力されていない場合" do
      let(:quiz_remote_branch) { build(:quiz_remote_branch, quiz_remote_branch_name: nil) }

      it "エラーになること" do
        quiz_remote_branch.valid?
        expect(quiz_remote_branch.errors.messages[:quiz_remote_branch_name]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_remote_branchのデータが削除された場合" do
      let(:quiz_remote_branch) { create(:quiz_remote_branch) }
      let!(:quiz_remote_commit_message) { create(:quiz_remote_commit_message, quiz_remote_branch:quiz_remote_branch) }
      let!(:quiz_remote_repository_file) { create(:quiz_remote_repository_file, quiz_remote_branch:quiz_remote_branch) }

      it "quiz_remote_branchに紐づいている4つの異なるテーブルのデータも削除されること" do
        expect do
          quiz_remote_branch.destroy
        end.to change(QuizRemoteCommitMessage, :count).by(-1).and change(QuizRemoteRepositoryFile, :count).by(-1)
      end
    end
  end
end
