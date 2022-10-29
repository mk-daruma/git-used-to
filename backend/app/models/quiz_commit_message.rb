class QuizCommitMessage < ApplicationRecord
  belongs_to :quiz_branch
  has_many :quiz_history_of_committed_files, dependent: :destroy
  has_many :quiz_repository_files, dependent: :destroy

  validates :quiz_commit_message, presence: true
end
