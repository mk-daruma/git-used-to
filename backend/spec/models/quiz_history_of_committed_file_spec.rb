require 'rails_helper'

RSpec.describe QuizHistoryOfCommittedFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:history_file) { create(:quiz_history_of_committed_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(history_file).to be_valid
      end
    end

    context "quiz_history_of_committed_file_nameの値が入力されていない場合" do
      let(:history_file) { build(:quiz_history_of_committed_file, quiz_history_of_committed_file_name: nil) }

      it "エラーになること" do
        history_file.valid?
        expect(history_file.errors.messages[:quiz_history_of_committed_file_name]).to include "can't be blank"
      end
    end

    context "quiz_history_of_committed_file_statusの値が入力されていない場合" do
      let(:history_file) { build(:quiz_history_of_committed_file, quiz_history_of_committed_file_status: nil) }

      it "エラーになること" do
        history_file.valid?
        expect(history_file.errors.messages[:quiz_history_of_committed_file_status]).to include "can't be blank"
      end
    end
  end

  describe "quiz_history_of_committed_files_count_must_be_within_limit" do
    let!(:branch) { create(:quiz_branch) }
    let!(:commit_message1) { create(:quiz_commit_message, quiz_branch: branch) }
    let!(:commit_message2) { create(:quiz_commit_message, quiz_branch: branch) }
    let!(:commit_message3) { create(:quiz_commit_message, quiz_branch: branch) }
    let!(:commit_message4) { create(:quiz_commit_message, quiz_branch: branch) }
    let!(:commit_message5) { create(:quiz_commit_message, quiz_branch: branch) }

    context "作成するquiz_history_of_committed_fileの各データに紐づくcommitMessageの種類が合計3つ以下の場合" do
      let(:history_files1) { build_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message1) }
      let(:history_files2) { build_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message2) }
      let(:history_files3) { build_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message3) }
      let(:history_files_list) { [history_files1, history_files2, history_files3] }

      it "新しいquiz_history_of_committed_fileデータ作成が成功すること" do
        history_files_list.each do |history_files|
          history_files.each do |history_file|
            expect do
              history_file.save
            end.to change(QuizHistoryOfCommittedFile, :count).by(+1)
          end
        end
      end
    end

    context "各データに紐づくcommitMessageの種類が既に3つ存在している場合" do
      let!(:history_files1) { create_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message1) }
      let!(:history_files2) { create_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message2) }
      let!(:history_files3) { create_list(:quiz_history_of_committed_file, 8, quiz_branch: branch, quiz_commit_message: commit_message3) }
      let(:history_file4) { build(:quiz_history_of_committed_file, quiz_branch: branch, quiz_commit_message: commit_message4) }

      it "4種類目のcommit_messegeに紐づいているquiz_history_of_committed_fileデータの作成が失敗すること" do
        expect do
          history_file4.save
        end.to change(QuizHistoryOfCommittedFile, :count).by(0)
        expect(history_file4.errors.messages[:base]).to include "quiz_history_of_committed_file_parent_commit types limit: 3"
      end
    end
  end
end
