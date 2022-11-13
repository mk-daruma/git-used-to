class QuizTag < ApplicationRecord
  belongs_to :quiz

  validates :tag, presence: true
end
