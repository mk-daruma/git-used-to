class QuizIndexFile < ApplicationRecord
  belongs_to :quiz_branch

  validates :quiz_index_file_name, presence: true
  validates :quiz_index_file_text_status, presence: true
end
