class QuizFirstOrLast < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_branches, dependent: :destroy
  has_many :quiz_remote_branches, dependent: :destroy
end
