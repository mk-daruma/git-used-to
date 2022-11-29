require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:user) { create(:user) }

      it "userのレコード作成が成功すること" do
        expect(user).to be_valid
      end
    end

    context "emailのみ値が入力されていない場合" do
      let(:user) { build(:user, email: nil) }

      it "エラーになること" do
        user.valid?
        expect(user.errors.messages[:email]).to include "can't be blank"
      end
    end

    context "passwordのみ値が入力されていない場合" do
      let(:user) { build(:user, password: nil) }

      it "エラーになること" do
        user.valid?
        expect(user.errors.messages[:password]).to include "can't be blank"
      end
    end
  end

  describe "validates uniqueness" do
    context "保存されたメールアドレスを使用して新規ユーザーが値を入力した場合" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, email: user1.email) }

      it "エラーになること" do
        user2.valid?
        expect(user2.errors.messages[:email]).to include "has already been taken"
      end
    end
  end

  describe "dependent: :destroy" do
    context "userのデータが削除された場合" do
      let(:user) { create(:user) }
      let!(:quiz) { create(:quiz, user: user) }
      let!(:quiz_answer_record) { create(:quiz_answer_record, user: user) }

      it "userに紐づいているquizのデータも削除されること" do
        expect do
          user.destroy
        end.to change(Quiz, :count).by(-1)
      end

      it "userに紐づいているquiz_answer_recordのデータも削除されること" do
        expect do
          user.destroy
        end.to change(QuizAnswerRecord, :count).by(-1)
      end
    end
  end

  describe "self.guest" do
    context "Userテーブルにゲストユーザーのデータが存在しない場合" do
      it "ゲストユーザーのデータが作成されること" do
        expect do
          User.guest
        end.to change(User, :count).by(+1)
      end
    end

    context "Userテーブルにゲストユーザーのデータが存在する場合" do
      let!(:guest_user) { create(:user, email: "guest_user@git-used-to.com") }

      it "ゲストユーザーのデータが作成されないこと" do
        expect do
          User.guest
        end.to change(User, :count).by(0)
      end
    end
  end

  describe "self.title" do
    let!(:user) { create(:user) }
    let!(:quiz) { create(:quiz, user: user) }

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が3未満の場合" do
      it "返ってくる値が'git-used-to見習い'であること" do
        expect(User.title(user)).to eq "git-used-to見習い"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が5未満の場合" do
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 2, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 2, quiz: quiz) }

      it "返ってくる値が'git-used-to初段'であること" do
        expect(User.title(user)).to eq "git-used-to初段"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が10未満の場合" do
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 5, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 4, quiz: quiz) }

      it "返ってくる値が'git-used-to二段'であること" do
        expect(User.title(user)).to eq "git-used-to二段"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が15未満の場合" do
      let!(:quizzes) { create_list(:quiz, 4, user: user) }
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 5, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 3, quiz: quiz) }

      it "返ってくる値が'git-used-to三段'であること" do
        expect(User.title(user)).to eq "git-used-to三段"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が30未満の場合" do
      let!(:quizzes) { create_list(:quiz, 9, user: user) }
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 10, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 10, quiz: quiz) }

      it "返ってくる値が'git-used-to四段'であること" do
        expect(User.title(user)).to eq "git-used-to四段"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が50未満の場合" do
      let!(:quizzes) { create_list(:quiz, 17, user: user) }
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 16, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 16, quiz: quiz) }

      it "返ってくる値が'git-used-to五段'であること" do
        expect(User.title(user)).to eq "git-used-to五段"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が80未満の場合" do
      let!(:quizzes) { create_list(:quiz, 26, user: user) }
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 27, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 26, quiz: quiz) }

      it "返ってくる値が'git-used-to達人'であること" do
        expect(User.title(user)).to eq "git-used-to達人"
      end
    end

    context "userが作成したクイズ数/回答済みのクイズ数/作成したクイズのブックマーク数の合計が80を超える場合" do
      let!(:quizzes) { create_list(:quiz, 26, user: user) }
      let!(:quiz_answer_records) { create_list(:quiz_answer_record, 27, user: user) }
      let!(:quiz_bookmarks) { create_list(:quiz_bookmark, 27, quiz: quiz) }

      it "返ってくる値が'免許皆伝 git-used-to師範代'であること" do
        expect(User.title(user)).to eq "免許皆伝 git-used-to師範代"
      end
    end
  end
end
