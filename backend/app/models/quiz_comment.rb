class QuizComment < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  validates :comment, presence: true, length: { in: 1..100 }
end
