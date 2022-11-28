class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :profile, :self_bookmarked, :give_title, :user_title]
  before_action :user_params, only: [:update]
  before_action :user_title, only: [:give_title]

  def index
    users = User.preload(:quizzes)
    users_hash = []
    users.map do |user|
      users_hash.push({
        id: user.id,
        user_name: user.user_name,
        image: user.image,
      })
    end
    render json: {
      status: 'SUCCESS',
      message: 'Loaded users',
      data: users_hash,
    }
  end

  def show
    quizzes = @user.quizzes
    quiz_answer_records = @user.quiz_answer_records
    quiz_comments = QuizComment.where(quiz_id: @user.quizzes.ids)
    quiz_tags = QuizTag.where(quiz_id: @user.quizzes.ids)
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      data: quizzes,
      data_answer_records: quiz_answer_records,
      data_comments: quiz_comments,
      data_tags: quiz_tags,
    }
  end

  def update
    @user.user_name = user_params[:user_name]
    @user.user_self_introduction = user_params[:user_self_introduction]
    @user.image = user_params[:image] if user_params[:image] != ""

    if @user.save
      render json: {
        status: 200,
        data: @user,
      }
    else
      render json: {
        status: 500,
        message: '更新に失敗しました',
      }
    end
  end

  def profile
    quizzes = @user.quizzes.length
    quiz_answer_records = @user.quiz_answer_records.length
    quiz_comments = @user.quiz_comments.length
    render json: {
      status: 'SUCCESS',
      message: 'Loaded user info',
      user_data: @user,
      quizzes_length: quizzes,
      quiz_answer_records_length: quiz_answer_records,
      quiz_comments_length: quiz_comments,
    }
  end

  def self_bookmarked
    self_bookmark_ids = @user.quiz_bookmarks
    self_bookmarked_quiz_hash = []
    self_bookmarked_quiz_bookmarks_hash = []
    self_bookmarked_quiz_comments_hash = []
    self_bookmarked_quiz_tags_hash = []
    self_bookmark_ids.each do |bookmark|
      self_bookmarked_quiz_hash.push(Quiz.where(id: bookmark.quiz_id))
      self_bookmarked_quiz_bookmarks_hash.push(QuizBookmark.where(quiz_id: bookmark.quiz_id))
      self_bookmarked_quiz_comments_hash.push(QuizComment.where(quiz_id: bookmark.quiz_id))
      self_bookmarked_quiz_tags_hash.push(QuizTag.where(quiz_id: bookmark.quiz_id))
    end
    render json: {
      status: 'SUCCESS',
      self_bookmarked_quizzes: self_bookmarked_quiz_hash.flatten,
      self_bookmarked_quiz_bookmarks: self_bookmarked_quiz_bookmarks_hash.flatten,
      self_bookmarked_quiz_comments: self_bookmarked_quiz_comments_hash.flatten,
      self_bookmarked_quiz_tags: self_bookmarked_quiz_tags_hash.flatten,
    }
  end

  def user_ranking
    rank_in_users_hash = []
    rank_in_users = User.preload(:quizzes)
    rank_in_users.each do |user|
      bookmark_count = QuizBookmark.where(quiz_id: Quiz.where(user_id: user.id)).length
      if bookmark_count >= 10
        rank_in_users_hash.push({
          create_user_id: user.id,
          create_user_name: user.user_name,
          create_user_image: user.image.url,
          bookmark_count: bookmark_count,
        })
      end
    end
    rank_in_users_hash.sort! { |a, b| b[:bookmark_count] <=> a[:bookmark_count] }
    render json: {
      status: 'SUCCESS',
      user_ranking: rank_in_users_hash,
    }
  end

  def give_title
    if @user.nickname != @user_rank
      @user.nickname = @user_rank
      if @user.save
        render json: {
          status: 200,
          user_data: @user,
          message: '称号に変化がありました',
        }
      else
        render json: {
          status: 500,
          message: '更新に失敗しました',
        }
      end
    else
      render json: {
        status: 200,
        message: '変化なし',
      }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(
      :user_name,
      :user_self_introduction,
      :image,
      :id,
      :nickname,
    )
  end

  def user_title
    total = User.title(@user)
    @user_rank =
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
      elsif total > 1
        "git-used-to見習い"
      end
  end
end
