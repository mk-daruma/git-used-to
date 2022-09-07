class QuizBranch < ApplicationRecord
  belongs_to :quiz
  has_many :quiz_commit_messages
  has_many :quiz_worktree_files
end
