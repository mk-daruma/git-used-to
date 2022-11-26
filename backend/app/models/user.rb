# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader
  has_many :quizzes, dependent: :destroy
  has_many :quiz_answer_records, dependent: :destroy
  has_many :quiz_bookmarks, dependent: :destroy
  has_many :quiz_comments, dependent: :destroy

  def self.guest
    find_or_create_by!(email: "guest_user@git-used-to.com") do |user|
      user.password = "guestusergitusedto"
      user.user_name = "guest user"
    end
  end
end
