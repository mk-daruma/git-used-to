class QuizRemoteRepositoryFile < ApplicationRecord
  belongs_to :quiz_remote_branch
  belongs_to :quiz_remote_commit_message
end
