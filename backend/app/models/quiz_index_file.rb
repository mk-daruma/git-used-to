class QuizIndexFile < ApplicationRecord
  MAX_QUIZ_INDEX_FILES_COUNT = 8

  belongs_to :quiz_branch

  validates :quiz_index_file_name, presence: true
  validates :quiz_index_file_text_status, presence: true

  validate :quiz_index_files_count_must_be_within_limit

  private

  def quiz_index_files_count_must_be_within_limit
    if quiz_branch.quiz_index_files.count >= MAX_QUIZ_INDEX_FILES_COUNT
      errors.add(:base, "quiz_index_files count limit: #{MAX_QUIZ_INDEX_FILES_COUNT}")
    end
  end
end
