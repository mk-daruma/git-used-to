class QuizHistoryOfCommittedFile < ApplicationRecord
  belongs_to :quiz_branch
  belongs_to :quiz_commit_message

  validates :quiz_history_of_committed_file_name, presence: true
  validates :quiz_history_of_committed_file_status, presence: true
end
