class QuizRemoteBranch < ApplicationRecord
  MAX_QUIZ_REMOTE_BRANCHES_COUNT = 3

  belongs_to :quiz_first_or_last
  has_many :quiz_remote_commit_messages, dependent: :destroy
  has_many :quiz_remote_repository_files, dependent: :destroy

  validates :quiz_remote_branch_name, presence: true

  validate :quiz_remote_branches_count_must_be_within_limit

  private

  def quiz_remote_branches_count_must_be_within_limit
    if quiz_first_or_last.quiz_remote_branches.count >= MAX_QUIZ_REMOTE_BRANCHES_COUNT
      errors.add(:base, "quiz_remote_branches count limit: #{MAX_QUIZ_REMOTE_BRANCHES_COUNT}")
    end
  end
end
