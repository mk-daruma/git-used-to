require 'rails_helper'

RSpec.describe QuizIndexFile, type: :model do
  def err_message(obj, karam)
    obj.errors.messages[karam]
  end

  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:index_file) { create(:quiz_index_file) }

      it "quiz_branchのレコード作成が成功すること" do
        expect(index_file).to be_valid
      end
    end

    context "quiz_index_file_nameの値が入力されていない場合" do
      let(:index_file) { build(:quiz_index_file, quiz_index_file_name: nil) }

      it "エラーになること" do
        index_file.valid?
        expect(index_file.errors.messages[:quiz_index_file_name]).to include "can't be blank"
      end
    end

    context "quiz_index_file_text_statusの値が入力されていない場合" do
      let(:index_file) { build(:quiz_index_file, quiz_index_file_text_status: nil) }

      it "エラーになること" do
        index_file.valid?
        expect(index_file.errors.messages[:quiz_index_file_text_status]).to include "can't be blank"
      end
    end
  end

  describe "quiz_index_files_count_must_be_within_limit" do
    let!(:branch) { create(:quiz_branch) }

    context "同じquiz_branchデータに紐づいたquiz_index_fileのデータ数が8個未満の場合" do
      let!(:index_files) { create_list(:quiz_index_file, 7, quiz_branch: branch) }
      let(:new_index_file) { build(:quiz_index_file, quiz_branch: branch) }

      it "新しいquiz_index_fileデータ作成が成功すること" do
        expect do
          new_index_file.save
        end.to change(QuizIndexFile, :count).by(+1)
      end
    end

    context "同じquiz_branchデータに紐づいたquiz_index_fileのデータが既に8個存在する場合" do
      let!(:index_files) { create_list(:quiz_index_file, 8, quiz_branch: branch) }
      let(:new_index_file) { build(:quiz_index_file, quiz_branch: branch) }

      it "新しいquiz_index_fileデータ作成が失敗すること" do
        expect do
          new_index_file.save
        end.to change(QuizIndexFile, :count).by(0)
        expect(err_message(new_index_file, :base)).to include "quiz_index_files count limit: 8"
      end
    end
  end
end
