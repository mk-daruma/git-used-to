class QuizFirstOrLast < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_branches
  has_many :quiz_remote_branches
end
