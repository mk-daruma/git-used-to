require 'rails_helper'

RSpec.describe QuizRepositoryFile, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:repository_file) { create(:quiz_repository_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(repository_file).to be_valid
      end
    end

    context "quiz_repository_file_nameの値が入力されていない場合" do
      let(:repository_file) { build(:quiz_repository_file, quiz_repository_file_name: nil) }

      it "エラーになること" do
        repository_file.valid?
        expect(repository_file.errors.messages[:quiz_repository_file_name]).to include "can't be blank"
      end
    end

    context "quiz_repository_file_text_statusの値が入力されていない場合" do
      let(:repository_file) { build(:quiz_repository_file, quiz_repository_file_text_status: nil) }

      it "エラーになること" do
        repository_file.valid?
        expect(repository_file.errors.messages[:quiz_repository_file_text_status]).to include "can't be blank"
      end
    end
  end

  describe "quiz_repository_files_count_must_be_within_limit" do
    let!(:branch) { create(:quiz_branch) }

    def err_message(obj, karam)
      obj.errors.messages[karam]
    end

    context "同じquiz_branchデータに紐づいたquiz_repository_fileのデータ数が8個未満の場合" do
      let!(:repository_files) { create_list(:quiz_repository_file, 7, quiz_branch: branch) }
      let(:new_repository_file) { build(:quiz_repository_file, quiz_branch: branch) }

      it "新しいquiz_repository_fileデータ作成が成功すること" do
        expect do
          new_repository_file.save
        end.to change(QuizRepositoryFile, :count).by(+1)
      end
    end

    context "同じquiz_branchデータに紐づいたquiz_repository_fileのデータが既に8個存在する場合" do
      let!(:branch) { create(:quiz_branch) }
      let!(:repository_files) { create_list(:quiz_repository_file, 8, quiz_branch: branch) }
      let(:new_repository_file) { build(:quiz_repository_file, quiz_branch: branch) }

      it "新しいquiz_repository_fileデータ作成が失敗すること" do
        expect do
          new_repository_file.save
        end.to change(QuizRepositoryFile, :count).by(0)
        expect(err_message(new_repository_file, :base)).to include "quiz_repository_files count limit: 8"
      end
    end
  end
end
