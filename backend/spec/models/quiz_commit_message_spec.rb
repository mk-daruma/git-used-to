require 'rails_helper'

RSpec.describe QuizCommitMessage, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:commit_message) { create(:quiz_commit_message) }

      it "quiz_commit_messageのレコード作成が成功すること" do
        expect(commit_message).to be_valid
      end
    end

    context "quiz_commit_message_nameの値が入力されていない場合" do
      let(:commit_message) { build(:quiz_commit_message, quiz_commit_message: nil) }

      it "エラーになること" do
        commit_message.valid?
        expect(commit_message.errors.messages[:quiz_commit_message]).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quiz_commit_messageのデータが削除された場合" do
      let(:commit_message) { create(:quiz_commit_message) }
      let!(:related_history_file) do
        create(:quiz_history_of_committed_file, quiz_commit_message: commit_message)
      end
      let!(:related_repository_file) do
        create(:quiz_repository_file, quiz_commit_message: commit_message)
      end

      it "quiz_commit_messageに紐づいている2つの異なるテーブルのデータも削除されること" do
        expect do
          commit_message.destroy
        end.to change(QuizHistoryOfCommittedFile, :count).by(-1).and change(QuizRepositoryFile, :count).by(-1)
      end
    end
  end

  describe "quiz_commit_messages_count_must_be_within_limit" do
    context "同じquiz_branchデータに紐づいたquiz_commit_messageのデータが既に10個存在する場合" do
      let!(:branch) { create(:quiz_branch) }
      let!(:commit_messages) { create_list(:quiz_commit_message, 10, quiz_branch: branch) }
      let(:new_commit_message) { build(:quiz_commit_message, quiz_branch: branch) }

      it "新しいquiz_commit_messageデータ作成が失敗すること" do
        expect do
          new_commit_message.save
        end.to change(QuizCommitMessage, :count).by(0)
        expect(err_message(new_commit_message, :base)).to include "quiz_commit_messages count limit: 10"
      end
    end
  end
end
