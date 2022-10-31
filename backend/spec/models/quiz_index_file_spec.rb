require 'rails_helper'

RSpec.describe QuizIndexFile, type: :model do
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
end
