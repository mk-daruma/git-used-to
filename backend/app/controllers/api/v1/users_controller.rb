class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :profile, :self_bookmarked, :give_title]
  before_action :user_params, only: [:update]

  def index
    users = User.preload(:quizzes)
    users_hash = []
    users.map do |user|
      users_hash.push({
        id: user.id,
        user_name: user.user_name,
        image: user.image,
        nickname: user.nickname,
      })
    end
    render json: {
      status: 'SUCCESS',
      message: 'Loaded users',
      data: users_hash,
    }
  end

  def show
    quiz_comments_hash = []
    QuizComment.where(quiz_id: @user.quizzes.ids).each do |comment|
      quiz_comments_hash.push({
        comment: comment,
        commented_user_name: User.find(comment.user_id).user_name,
        commented_user_image: User.find(comment.user_id).image.url,
      })
    end
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      data: @user.quizzes,
      created_user_name: @user.user_name,
      created_user_title: @user.nickname,
      created_user_image: @user.image.url,
      data_answer_records: @user.quiz_answer_records,
      data_comments: quiz_comments_hash,
      data_bookmarks: QuizBookmark.where(quiz_id: @user.quizzes.ids),
      data_tags: QuizTag.where(quiz_id: @user.quizzes.ids),
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
    quiz_bookmarks = QuizBookmark.where(quiz_id: Quiz.where(user_id: @user.id)).length
    all_user_count = User.preload(:quizzes).length
    quiz_average = Quiz.preload(:user).length
    quiz_answer_record_average = QuizAnswerRecord.preload(:quiz).length
    quiz_bookmark_average = QuizBookmark.preload(:quiz).length
    render json: {
      status: 'SUCCESS',
      message: 'Loaded user info',
      user_data: @user,
      quizzes_length: quizzes,
      quiz_answer_records_length: quiz_answer_records,
      quiz_bookmarks_length: quiz_bookmarks,
      quiz_average: quiz_average / all_user_count,
      quiz_answer_record_average: quiz_answer_record_average / all_user_count,
      quiz_bookmark_average: quiz_bookmark_average / all_user_count,
    }
  end

  def self_bookmarked
    self_bookmark_ids = @user.quiz_bookmarks
    self_bookmarked_quiz_hash = []
    self_bookmarked_quiz_bookmarks_hash = []
    self_bookmarked_quiz_comments_hash = []
    self_bookmarked_quiz_tags_hash = []
    self_bookmark_ids.each do |bookmark|
      quiz = Quiz.find(bookmark.quiz_id)
      created_user = User.find(quiz.user_id)
      self_bookmarked_quiz_hash.push({
        quiz: quiz,
        created_user_name: created_user.user_name,
        created_user_nickname: created_user.nickname,
        created_user_image: created_user.image.url,
      })
      QuizComment.where(quiz_id: bookmark.quiz_id).each do |comment|
        self_bookmarked_quiz_comments_hash.push({
          comment: comment,
          commented_user_name: User.find(comment.user_id).user_name,
          commented_user_image: User.find(comment.user_id).image.url,
        })
      end
      self_bookmarked_quiz_bookmarks_hash.push(QuizBookmark.where(quiz_id: bookmark.quiz_id))
      self_bookmarked_quiz_tags_hash.push(QuizTag.where(quiz_id: bookmark.quiz_id))
    end
    render json: {
      status: 'SUCCESS',
      data: {
        self_bookmarked_quizzes: self_bookmarked_quiz_hash.flatten,
        self_bookmarked_quiz_bookmarks: self_bookmarked_quiz_bookmarks_hash.flatten,
        self_bookmarked_quiz_comments: self_bookmarked_quiz_comments_hash.flatten,
        self_bookmarked_quiz_tags: self_bookmarked_quiz_tags_hash.flatten,
      },
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
          create_user_introduction: user.user_self_introduction,
          create_user_image: user.image.url,
          create_user_title: user.nickname,
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
    user_rank = User.title(@user)
    if @user.nickname != user_rank
      @user.nickname = user_rank
      if @user.save
        render json: {
          status: 200,
          user_data: @user.nickname,
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
        user_data: @user.nickname,
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
end
