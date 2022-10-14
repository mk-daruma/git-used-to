class QuizBranch < ApplicationRecord
  belongs_to :quiz_first_or_last
  has_many :quiz_commit_messages
  has_many :quiz_worktree_files
  has_many :quiz_index_files
  has_many :quiz_remote_repository_files
  has_many :quiz_repository_files
end
