class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_first_or_lasts, dependent: :destroy

  validates :quiz_title, presence: true
  validates :quiz_introduction, presence: true, length: { in: 30..200 }
end
