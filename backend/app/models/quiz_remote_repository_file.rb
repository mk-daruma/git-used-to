class QuizRemoteRepositoryFile < ApplicationRecord
  belongs_to :quiz_remote_branch
  belongs_to :quiz_remote_commit_message

  validates :quiz_remote_repository_file_name, presence: true
  validates :quiz_remote_repository_file_text_status, presence: true
end
