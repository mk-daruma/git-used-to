require 'rails_helper'

RSpec.describe Quiz, type: :model do
  def fake_alphanumeric(num)
    Faker::Alphanumeric.alpha(number: num)
  end

  def err_message(karam)
    quiz.errors.messages[karam]
  end

  describe "validates presence" do
    context "全ての値が入力され、quiz_introductionの文字数が30文字の場合" do
      let(:quiz) { create(:quiz) }

      it "quizのレコード作成が成功すること" do
        expect(quiz).to be_valid
      end
    end

    context "全ての値が入力され、quiz_introductionの文字数が30文字未満の場合" do
      let(:quiz) { build(:quiz, quiz_introduction: fake_alphanumeric(29)) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "is too short (minimum is 30 characters)"
      end
    end

    context "全ての値が入力され、quiz_introductionの文字数が201文以上の場合" do
      let(:quiz) { build(:quiz, quiz_introduction: fake_alphanumeric(201)) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "is too long (maximum is 200 characters)"
      end
    end

    context "quiz_titleのみ値が入力されていない場合" do
      let(:quiz) { build(:quiz, quiz_title: nil) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_title)).to include "can't be blank"
      end
    end

    context "quiz_introductionのみ値が入力されていない場合" do
      let(:quiz) { build(:quiz, quiz_introduction: nil) }

      it "エラーになること" do
        quiz.valid?
        expect(err_message(:quiz_introduction)).to include "can't be blank"
      end
    end
  end

  describe "dependent: :destroy" do
    context "quizのデータが削除された場合" do
      let(:quiz) { create(:quiz) }
      let!(:quiz_first_or_last) { create(:quiz_first_or_last, quiz: quiz) }
      let!(:quiz_answer_record) { create(:quiz_answer_record, quiz: quiz) }
      let!(:quiz_bookmark) { create(:quiz_bookmark, quiz: quiz) }
      let!(:quiz_comment) { create(:quiz_comment, quiz: quiz) }
      let!(:quiz_tag) { create(:quiz_tag, quiz: quiz) }

      it "quizに紐づいているquiz_first_or_lastのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizFirstOrLast, :count).by(-1)
      end

      it "quizに紐づいているquiz_answer_recordのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizAnswerRecord, :count).by(-1)
      end

      it "quizに紐づいているquiz_bookmarkのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizBookmark, :count).by(-1)
      end

      it "quizに紐づいているquiz_commentのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizComment, :count).by(-1)
      end

      it "quizに紐づいているquiz_tagのデータも削除されること" do
        expect do
          quiz.destroy
        end.to change(QuizTag, :count).by(-1)
      end
    end
  end

  describe "limit_quiz_data_count_by_nickname" do
    context "userのnicknameの値が'git-used-to見習い'で、既に作成したクイズが3個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to見習い") }
      let!(:quizzes) { create_list(:quiz, 3, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to見習い'の場合、作成できるクイズは3個までです"
      end
    end

    context "userのnicknameの値が'git-used-to見習い'で、既に作成したクイズが3個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to見習い") }
      let!(:quizzes) { create_list(:quiz, 2, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to初段'で、既に作成したクイズが5個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to初段") }
      let!(:quizzes) { create_list(:quiz, 5, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to初段'の場合、作成できるクイズは5個までです"
      end
    end

    context "userのnicknameの値が'git-used-to初段'で、既に作成したクイズが5個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to初段") }
      let!(:quizzes) { create_list(:quiz, 4, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to二段'で、既に作成したクイズが7個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to二段") }
      let!(:quizzes) { create_list(:quiz, 7, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to二段'の場合、作成できるクイズは7個までです"
      end
    end

    context "userのnicknameの値が'git-used-to二段'で、既に作成したクイズが7個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to二段") }
      let!(:quizzes) { create_list(:quiz, 6, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to三段'で、既に作成したクイズが10個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to三段") }
      let!(:quizzes) { create_list(:quiz, 10, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to三段'の場合、作成できるクイズは10個までです"
      end
    end

    context "userのnicknameの値が'git-used-to三段'で、既に作成したクイズが10個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to三段") }
      let!(:quizzes) { create_list(:quiz, 9, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to四段'で、既に作成したクイズが12個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to四段") }
      let!(:quizzes) { create_list(:quiz, 12, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to四段'の場合、作成できるクイズは12個までです"
      end
    end

    context "userのnicknameの値が'git-used-to四段'で、既に作成したクイズが12個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to四段") }
      let!(:quizzes) { create_list(:quiz, 11, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to五段'で、既に作成したクイズが15個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to五段") }
      let!(:quizzes) { create_list(:quiz, 15, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to五段'の場合、作成できるクイズは15個までです"
      end
    end

    context "userのnicknameの値が'git-used-to五段'で、既に作成したクイズが15個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to五段") }
      let!(:quizzes) { create_list(:quiz, 11, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'git-used-to達人'で、既に作成したクイズが20個以上存在する場合" do
      let!(:user) { create(:user, nickname: "git-used-to達人") }
      let!(:quizzes) { create_list(:quiz, 20, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'git-used-to達人'の場合、作成できるクイズは20個までです"
      end
    end

    context "userのnicknameの値が'git-used-to達人'で、既に作成したクイズが20個未満の場合" do
      let!(:user) { create(:user, nickname: "git-used-to達人") }
      let!(:quizzes) { create_list(:quiz, 19, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end

    context "userのnicknameの値が'免許皆伝 git-used-to師範代'で、既に作成したクイズが30個の場合" do
      let!(:user) { create(:user, nickname: "免許皆伝 git-used-to師範代") }
      let!(:quizzes) { create_list(:quiz, 30, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されないこと" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(0)
      end

      it "エラーメッセージが返ってくること" do
        quiz.valid?
        expect(quiz.errors.messages[:base]).to include "称号が'免許皆伝 git-used-to師範代'の場合、作成できるクイズは30個までです"
      end
    end

    context "userのnicknameの値が'免許皆伝 git-used-to師範代'で、既に作成したクイズが30個未満の場合" do
      let!(:user) { create(:user, nickname: "免許皆伝 git-used-to師範代") }
      let!(:quizzes) { create_list(:quiz, 29, user: user) }
      let(:quiz) { build(:quiz, user: user) }

      it "quizのデータが作成されること" do
        expect do
          quiz.save
        end.to change(Quiz, :count).by(1)
      end
    end
  end
end
