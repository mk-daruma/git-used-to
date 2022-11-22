class QuizBranch < ApplicationRecord
  MAX_QUIZ_BRANCHES_COUNT = 3

  belongs_to :quiz_first_or_last
  has_many :quiz_commit_messages, dependent: :destroy
  has_many :quiz_worktree_files, dependent: :destroy
  has_many :quiz_index_files, dependent: :destroy
  has_many :quiz_history_of_committed_files, dependent: :destroy
  has_many :quiz_repository_files, dependent: :destroy

  validates :quiz_branch_name, presence: true
  validate :quiz_branches_count_must_be_within_limit

  private

  def quiz_branches_count_must_be_within_limit
    if quiz_first_or_last.quiz_branches.count >= MAX_QUIZ_BRANCHES_COUNT
      errors.add(:base, "quiz_branches count limit: #{MAX_QUIZ_BRANCHES_COUNT}")
    end
  end
end
