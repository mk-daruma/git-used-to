class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_first_or_lasts, dependent: :destroy
  has_many :quiz_answer_records, dependent: :destroy
  has_many :quiz_bookmarks, dependent: :destroy
  has_many :quiz_comments, dependent: :destroy
  has_many :quiz_tags, dependent: :destroy

  validates :quiz_title, presence: true
  validates :quiz_introduction, presence: true, length: { in: 30..200 }

  validate :guest_user_create_quiuz_limit, on: :create

  validate :limit_quiz_data_count_by_nickname, on: :create

  private

  def limit_quiz_data_count_by_nickname
    nickname = User.find(user_id).nickname
    quiz_count = User.find(user_id).quizzes.length
    if nickname === "git-used-to見習い"
      errors.add(:base, "称号が'git-used-to見習い'の場合、作成できるクイズは3個までです") if quiz_count >= 3
    elsif nickname === "git-used-to初段"
      errors.add(:base, "称号が'git-used-to初段'の場合、作成できるクイズは5個までです") if quiz_count >= 5
    elsif nickname === "git-used-to二段"
      errors.add(:base, "称号が'git-used-to二段'の場合、作成できるクイズは7個までです") if quiz_count >= 7
    elsif nickname === "git-used-to三段"
      errors.add(:base, "称号が'git-used-to三段'の場合、作成できるクイズは10個までです") if quiz_count >= 10
    elsif nickname === "git-used-to四段"
      errors.add(:base, "称号が'git-used-to四段'の場合、作成できるクイズは12個までです") if quiz_count >= 12
    elsif nickname === "git-used-to五段"
      errors.add(:base, "称号が'git-used-to五段'の場合、作成できるクイズは15個までです") if quiz_count >= 15
    elsif nickname === "git-used-to達人"
      errors.add(:base, "称号が'git-used-to達人'の場合、作成できるクイズは20個までです") if quiz_count >= 20
    elsif nickname === "免許皆伝 git-used-to師範代"
      errors.add(:base, "称号が'免許皆伝 git-used-to師範代'の場合、作成できるクイズは30個までです") if quiz_count >= 30
    end
  end

  def guest_user_create_quiuz_limit
    if User.find(user_id).email === "guest_user@git-used-to.com"
      errors.add(:base, "guest_user@git-used-to.com can't create quiz")
    end
  end
end
