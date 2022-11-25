class QuizComment < ApplicationRecord
  GUEST_USER_ADRESS = "guest_user@git-used-to.com"

  belongs_to :quiz
  belongs_to :user

  validates :comment, presence: true, length: { in: 1..100 }

  validate :guest_user_create_quiz_bookmark_limit, on: :create

  private

  def guest_user_create_quiz_bookmark_limit
    if User.find(user_id).email === GUEST_USER_ADRESS
      errors.add(:base, "#{GUEST_USER_ADRESS} can't create quiz comments")
    end
  end
end
