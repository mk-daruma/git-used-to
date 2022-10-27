class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_first_or_lasts, dependent: :destroy
end
