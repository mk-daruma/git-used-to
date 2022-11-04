class QuizBookmark < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  validates_uniqueness_of :quiz_id, scope: :user_id
end
