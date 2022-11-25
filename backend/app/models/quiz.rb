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

  private

  def guest_user_create_quiuz_limit
    if User.find(user_id).email === "guest_user@git-used-to.com"
      errors.add(:base, "guest_user@git-used-to.com can't create quiz")
    end
  end
end
