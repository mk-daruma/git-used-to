require 'rails_helper'

private

def err_message(karam)
  remote_repository_file.errors.messages[karam]
end

RSpec.describe QuizRemoteRepositoryFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:remote_repository_file) { create(:quiz_remote_repository_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(remote_repository_file).to be_valid
      end
    end

    context "quiz_remote_repository_file_nameの値が入力されていない場合" do
      let(:remote_repository_file) { build(:quiz_remote_repository_file, quiz_remote_repository_file_name: nil) }

      it "エラーになること" do
        remote_repository_file.valid?
        expect(err_message(:quiz_remote_repository_file_name)).to include "can't be blank"
      end
    end

    context "quiz_remote_repository_file_text_statusの値が入力されていない場合" do
      let(:remote_repository_file) do
        build(:quiz_remote_repository_file, quiz_remote_repository_file_text_status: nil)
      end

      it "エラーになること" do
        remote_repository_file.valid?
        expect(err_message(:quiz_remote_repository_file_text_status)).to include "can't be blank"
      end
    end
  end

  describe "quiz_remote_repository_files_count_must_be_within_limit" do
    def err_message(obj, karam)
      obj.errors.messages[karam]
    end

    context "同じquiz_branchデータに紐づいたquiz_remote_repository_fileのデータが既に8個存在する場合" do
      let!(:remote_branch) { create(:quiz_remote_branch) }
      let!(:remote_repository_files) { create_list(:quiz_remote_repository_file, 16, quiz_remote_branch: remote_branch) }
      let(:new_remote_repository_file) { build(:quiz_remote_repository_file, quiz_remote_branch: remote_branch) }

      it "新しいquiz_remote_repository_fileデータ作成が失敗すること" do
        expect do
          new_remote_repository_file.save
        end.to change(QuizRemoteRepositoryFile, :count).by(0)
        expect(err_message(new_remote_repository_file, :base)).to include "quiz_remote_repository_files count limit: 16"
      end
    end
  end
end
