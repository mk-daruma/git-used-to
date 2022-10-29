class QuizRepositoryFile < ApplicationRecord
  belongs_to :quiz_branch
  belongs_to :quiz_commit_message

  validates :quiz_repository_file_name, presence: true
  validates :quiz_repository_file_text_status, presence: true
end
