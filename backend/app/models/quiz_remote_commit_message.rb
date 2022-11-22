class QuizRemoteCommitMessage < ApplicationRecord
  MAX_QUIZ_REMOTE_COMMIT_MESSAGES_COUNT = 10

  belongs_to :quiz_remote_branch
  has_many :quiz_remote_repository_files, dependent: :destroy

  validates :quiz_remote_commit_message, presence: true

  validate :quiz_remote_commit_messages_count_must_be_within_limit

  private

  def quiz_remote_commit_messages_count_must_be_within_limit
    if quiz_remote_branch.quiz_remote_commit_messages.count >= MAX_QUIZ_REMOTE_COMMIT_MESSAGES_COUNT
      errors.add(:base, "quiz_remote_commit_messages count limit: #{MAX_QUIZ_REMOTE_COMMIT_MESSAGES_COUNT}")
    end
  end
end
