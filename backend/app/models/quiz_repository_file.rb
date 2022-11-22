class QuizRepositoryFile < ApplicationRecord
  MAX_QUIZ_REPOSITORY_FILES_COUNT = 8

  belongs_to :quiz_branch
  belongs_to :quiz_commit_message

  validates :quiz_repository_file_name, presence: true
  validates :quiz_repository_file_text_status, presence: true

  validate :quiz_repository_files_count_must_be_within_limit

  private

  def quiz_repository_files_count_must_be_within_limit
    if quiz_branch.quiz_repository_files.count >= MAX_QUIZ_REPOSITORY_FILES_COUNT
      errors.add(:base, "quiz_repository_files count limit: #{MAX_QUIZ_REPOSITORY_FILES_COUNT}")
    end
  end
end
