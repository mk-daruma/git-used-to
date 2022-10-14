class QuizCommitMessage < ApplicationRecord
  belongs_to :quiz_branch
  has_many :quiz_remote_repository_files
  has_many :quiz_repository_files
end
