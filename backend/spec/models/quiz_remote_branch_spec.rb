require 'rails_helper'

RSpec.describe QuizRemoteBranch, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:remote_branch) { create(:quiz_remote_branch) }

      it "quiz_remote_branchのレコード作成が成功すること" do
        expect(remote_branch).to be_valid
      end
    end

    context "quiz_remote_branch_nameの値が入力されていない場合" do
      let(:remote_branch) { build(:quiz_remote_branch, quiz_remote_branch_name: nil) }

      it "エラーになること" do
        remote_branch.valid?
        expect(remote_branch.errors.messages[:quiz_remote_branch_name]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_remote_branchのデータが削除された場合" do
      let(:remote_branch) { create(:quiz_remote_branch) }
      let!(:remote_commit_message) do
        create(:quiz_remote_commit_message, quiz_remote_branch: remote_branch)
      end
      let!(:remote_repository_file) do
        create(:quiz_remote_repository_file, quiz_remote_branch: remote_branch)
      end

      it "quiz_remote_branchに紐づいている4つの異なるテーブルのデータも削除されること" do
        expect do
          remote_branch.destroy
        end.to change(QuizRemoteCommitMessage, :count).by(-1).and change(QuizRemoteRepositoryFile, :count).by(-1)
      end
    end
  end

  describe "quiz_remote_branches_count_must_be_within_limit" do
    let!(:quiz_first_or_last) { create(:quiz_first_or_last) }

    context "同じquiz_first_or_lastデータに紐づいたquiz_remote_branchのデータ数が3個未満の場合" do
      let!(:remote_branch) { create_list(:quiz_remote_branch, 2, quiz_first_or_last: quiz_first_or_last) }
      let(:new_remote_branch) { build(:quiz_remote_branch, quiz_first_or_last: quiz_first_or_last) }

      it "新しいquiz_remote_branchデータ作成が成功すること" do
        expect do
          new_remote_branch.save
        end.to change(QuizRemoteBranch, :count).by(+1)
      end
    end

    context "同じquiz_first_or_lastデータに紐づいたquiz_remote_branchのデータが既に3個存在する場合" do
      let!(:remote_branch) { create_list(:quiz_remote_branch, 3, quiz_first_or_last: quiz_first_or_last) }
      let(:new_remote_branch) { build(:quiz_remote_branch, quiz_first_or_last: quiz_first_or_last) }

      it "新しいquiz_remote_branchデータ作成が失敗すること" do
        expect do
          new_remote_branch.save
        end.to change(QuizRemoteBranch, :count).by(0)
        expect(err_message(new_remote_branch, :base)).to include "quiz_remote_branches count limit: 3"
      end
    end
  end
end
