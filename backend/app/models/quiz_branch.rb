class QuizBranch < ApplicationRecord
  belongs_to :quiz_first_or_last
  has_many :quiz_commit_messages, dependent: :destroy
  has_many :quiz_worktree_files, dependent: :destroy
  has_many :quiz_index_files, dependent: :destroy
  has_many :quiz_history_of_committed_files, dependent: :destroy
  has_many :quiz_repository_files, dependent: :destroy
end
