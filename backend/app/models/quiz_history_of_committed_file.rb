class QuizHistoryOfCommittedFile < ApplicationRecord
  belongs_to :quiz_branch
  belongs_to :quiz_commit_message
end
