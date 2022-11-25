class QuizAnswerRecord < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates_uniqueness_of :quiz_id, scope: :user_id

  validate :guest_user_create_quiuz_limit, on: :create

  private

  def guest_user_create_quiuz_limit
    if User.find(user_id).email === "guest_user@git-used-to.com"
      errors.add(:base, "guest_user@git-used-to.com can't create quiz answer records")
    end
  end
end
