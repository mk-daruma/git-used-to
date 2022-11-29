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

  def self.title(user)
    quiz_count = user.quizzes.length
    quiz_answer_record_count = user.quiz_answer_records.length
    bookmark_count = QuizBookmark.where(quiz_id: Quiz.where(user_id: user.id)).length
    total = quiz_count + quiz_answer_record_count + bookmark_count
    user_rank =
      if total > 80
        "免許皆伝 git-used-to師範代"
      elsif total > 50
        "git-used-to達人"
      elsif total > 30
        "git-used-to五段"
      elsif total > 15
        "git-used-to四段"
      elsif total > 10
        "git-used-to三段"
      elsif total > 5
        "git-used-to二段"
      elsif total > 3
        "git-used-to初段"
      elsif total >= 0
        "git-used-to見習い"
      end
  end
end
