require 'rails_helper'

RSpec.describe QuizRemoteCommitMessage, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:remote_commit_message) { create(:quiz_remote_commit_message) }

      it "quiz_remote_commit_messageのレコード作成が成功すること" do
        expect(remote_commit_message).to be_valid
      end
    end

    context "quiz_remote_commit_message_nameの値が入力されていない場合" do
      let(:remote_commit_message) { build(:quiz_remote_commit_message, quiz_remote_commit_message: nil) }

      it "エラーになること" do
        remote_commit_message.valid?
        expect(remote_commit_message.errors.messages[:quiz_remote_commit_message]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_remote_commit_messageのデータが削除された場合" do
      let(:remote_commit_message) { create(:quiz_remote_commit_message) }
      let!(:remote_repository_file) do
        create(:quiz_remote_repository_file, quiz_remote_commit_message: remote_commit_message)
      end

      it "quiz_remote_commit_messageに紐づいている2つの異なるテーブルのデータも削除されること" do
        expect do
          remote_commit_message.destroy
        end.to change(QuizRemoteRepositoryFile, :count).by(-1)
      end
    end
  end

  describe "quiz_remote_commit_messages_count_must_be_within_limit" do
    context "同じquiz_branchデータに紐づいたquiz_commit_messageのデータが既に10個存在する場合" do
      let!(:remote_branch) { create(:quiz_remote_branch) }
      let!(:remote_commit_messages) { create_list(:quiz_remote_commit_message, 10, quiz_remote_branch: remote_branch) }
      let(:new_remote_commit_message) { build(:quiz_remote_commit_message, quiz_remote_branch: remote_branch) }

      it "新しいquiz_commit_messageデータ作成が失敗すること" do
        expect do
          new_remote_commit_message.save
        end.to change(QuizRemoteCommitMessage, :count).by(0)
        expect(err_message(new_remote_commit_message, :base)).to include "quiz_remote_commit_messages count limit: 10"
      end
    end
  end
end
