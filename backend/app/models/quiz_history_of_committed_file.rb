class QuizHistoryOfCommittedFile < ApplicationRecord
  MAX_PARENT_COMMIT_TYPE_COUNT = 3

  belongs_to :quiz_branch
  belongs_to :quiz_commit_message

  validates :quiz_history_of_committed_file_name, presence: true
  validates :quiz_history_of_committed_file_status, presence: true

  validate :quiz_history_of_committed_file_parent_commit_message_id_types_limit

  private

  def quiz_history_of_committed_file_parent_commit_message_id_types_limit
    types_limit_hash = []
    history_files_parent_same_branches = QuizHistoryOfCommittedFile.where(quiz_branch_id: quiz_branch_id)

    history_files_parent_same_branches.each do |history_file|
      types_limit_hash.push(history_file.quiz_commit_message_id)
    end

    if types_limit_hash.uniq.length >= MAX_PARENT_COMMIT_TYPE_COUNT && types_limit_hash.exclude?(quiz_commit_message_id)
      errors.add(:base, "quiz_history_of_committed_file_parent_commit types limit: #{MAX_PARENT_COMMIT_TYPE_COUNT}")
    end
  end
end
