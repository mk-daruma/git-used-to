class QuizRemoteBranch < ApplicationRecord
  belongs_to :quiz_first_or_last
  has_many :quiz_remote_commit_messages
  has_many :quiz_remote_repository_files
end
