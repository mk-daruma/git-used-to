class QuizComment < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  validates :comment, presence: true, length: { in: 1..100 }

  validate :guest_user_create_quiz_bookmark_limit, on: :create

  private

  def guest_user_create_quiz_bookmark_limit
    if User.find(user_id).email === "guest_user@git-used-to.com"
      errors.add(:base, "guest_user@git-used-to.com can't create quiz comments")
    end
  end
end
