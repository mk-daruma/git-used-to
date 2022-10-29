require 'rails_helper'

RSpec.describe QuizRemoteCommitMessage, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:quiz_remote_commit_message) { create(:quiz_remote_commit_message) }

      it "quiz_remote_commit_messageのレコード作成が成功すること" do
        expect(quiz_remote_commit_message).to be_valid
      end
    end

    context "quiz_remote_commit_message_nameの値が入力されていない場合" do
      let(:quiz_remote_commit_message) { build(:quiz_remote_commit_message, quiz_remote_commit_message: nil) }

      it "エラーになること" do
        quiz_remote_commit_message.valid?
        expect(quiz_remote_commit_message.errors.messages[:quiz_remote_commit_message]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_remote_commit_messageのデータが削除された場合" do
      let(:quiz_remote_commit_message) { create(:quiz_remote_commit_message) }
      let!(:quiz_remote_repository_file) { create(:quiz_remote_repository_file, quiz_remote_commit_message:quiz_remote_commit_message) }

      it "quiz_remote_commit_messageに紐づいている2つの異なるテーブルのデータも削除されること" do
        expect do
          quiz_remote_commit_message.destroy
        end.to change(QuizRemoteRepositoryFile, :count).by(-1)
      end
    end
  end
end
