class QuizFirstOrLast < ApplicationRecord
  MAX_QUIZ_FIRST_OR_LASTS_COUNT = 2

  belongs_to :quiz
  has_many :quiz_branches, dependent: :destroy
  has_many :quiz_remote_branches, dependent: :destroy

  validates :quiz_first_or_last_status, presence: true
  validate :quiz_first_or_lasts_count_must_be_within_limit

  private

    def quiz_first_or_lasts_count_must_be_within_limit
      errors.add(:base, "quiz_first_or_lasts count limit: #{MAX_QUIZ_FIRST_OR_LASTS_COUNT}") if quiz.quiz_first_or_lasts.count >= MAX_QUIZ_FIRST_OR_LASTS_COUNT
    end
end
