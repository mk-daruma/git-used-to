class QuizCommitMessage < ApplicationRecord
  belongs_to :quiz_branch
  has_many :quiz_history_of_committed_files
  has_many :quiz_repository_files
end
