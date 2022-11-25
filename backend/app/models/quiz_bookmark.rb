class QuizBookmark < ApplicationRecord
  GUEST_USER_ADRESS = "guest_user@git-used-to.com"

  belongs_to :quiz
  belongs_to :user

  validates_uniqueness_of :quiz_id, scope: :user_id

  validate :guest_user_create_quiz_bookmark_limit, on: :create

  private

  def guest_user_create_quiz_bookmark_limit
    if User.find(user_id).email === GUEST_USER_ADRESS
      errors.add(:base, "#{GUEST_USER_ADRESS} can't create quiz")
    end
  end
end
