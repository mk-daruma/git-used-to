class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :profile]
  before_action :user_params, only: [:update]

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
    quiz_comments = QuizComment.where(quiz_id: @user.quizzes.ids).length
    render json: {
      status: 'SUCCESS',
      message: 'Loaded user info',
      user_data: @user,
      quizzes_length: quizzes,
      quiz_answer_records_length: quiz_answer_records,
      quiz_comments_length: quiz_comments,
    }
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
    )
  end
end
