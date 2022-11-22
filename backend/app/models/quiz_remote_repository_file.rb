class QuizRemoteRepositoryFile < ApplicationRecord
  MAX_QUIZ_REMOTE_REPOSITORY_FILES_COUNT = 16

  belongs_to :quiz_remote_branch
  belongs_to :quiz_remote_commit_message

  validates :quiz_remote_repository_file_name, presence: true
  validates :quiz_remote_repository_file_text_status, presence: true

  validate :quiz_remote_repository_files_count_must_be_within_limit

  private

  def quiz_remote_repository_files_count_must_be_within_limit
    if quiz_remote_branch.quiz_remote_repository_files.count >= MAX_QUIZ_REMOTE_REPOSITORY_FILES_COUNT
      errors.add(:base, "quiz_remote_repository_files count limit: #{MAX_QUIZ_REMOTE_REPOSITORY_FILES_COUNT}")
    end
  end
end
