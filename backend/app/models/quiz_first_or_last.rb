class QuizFirstOrLast < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_branches
end
