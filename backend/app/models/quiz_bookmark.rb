class QuizBookmark < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  validates_uniqueness_of :quiz_id, scope: :user_id

  validate :guest_user_create_quiz_bookmark_limit, on: :create

  private

  def guest_user_create_quiz_bookmark_limit
    if User.find(user_id).email === "guest_user@git-used-to.com"
      errors.add(:base, "guest_user@git-used-to.com can't create quiz")
    end
  end
end
