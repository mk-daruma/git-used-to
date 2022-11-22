class QuizCommitMessage < ApplicationRecord
  MAX_QUIZ_COMMIT_MESSAGES_COUNT = 10

  belongs_to :quiz_branch
  has_many :quiz_history_of_committed_files, dependent: :destroy
  has_many :quiz_repository_files, dependent: :destroy

  validates :quiz_commit_message, presence: true
  validate :quiz_commit_messages_count_must_be_within_limit

  private

  def quiz_commit_messages_count_must_be_within_limit
    if quiz_branch.quiz_commit_messages.count >= MAX_QUIZ_COMMIT_MESSAGES_COUNT
      errors.add(:base, "quiz_commit_messages count limit: #{MAX_QUIZ_COMMIT_MESSAGES_COUNT}")
    end
  end
end
