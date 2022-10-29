class QuizWorktreeFile < ApplicationRecord
  belongs_to :quiz_branch

  validates :quiz_worktree_file_name, presence: true
  validates :quiz_worktree_file_text_status, presence: true
end
