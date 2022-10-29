class QuizRemoteCommitMessage < ApplicationRecord
  belongs_to :quiz_remote_branch
  has_many :quiz_remote_repository_files, dependent: :destroy

  validates :quiz_remote_commit_message, presence: true
end
