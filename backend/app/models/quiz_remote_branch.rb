class QuizRemoteBranch < ApplicationRecord
  belongs_to :quiz_first_or_last
  has_many :quiz_remote_commit_messages, dependent: :destroy
  has_many :quiz_remote_repository_files, dependent: :destroy

  validates :quiz_remote_branch_name, presence: true
end
