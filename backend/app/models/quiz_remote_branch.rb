class QuizRemoteBranch < ApplicationRecord
  belongs_to :quiz_first_or_last
  has_many :quiz_Remote_commit_messages
end
