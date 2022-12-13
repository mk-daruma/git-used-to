class Api::V1::QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :update, :destroy, :tag]

  def index
    quiz_hash = []
    quizzes = Quiz.preload(:user)
    quizzes.map do |quiz|
      user = User.find(quiz.user_id)
      quiz_hash.push({
        quiz: quiz,
        created_user_name: user.user_name,
        created_user_nickname: user.nickname,
        created_user_image: user.image.url,
      })
    end
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      data: quiz_hash,
    }
  end

  def create
    quiz = Quiz.new(quiz_params)
    if quiz.save
      render json: {
        status: 'SUCCESS',
        data: quiz,
      }
    else
      render json: quiz.errors
    end
  end

  def show
    quiz_first_or_lasts = @quiz.quiz_first_or_lasts
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      quiz_data: @quiz,
      quiz_first_or_lasts_data: quiz_first_or_lasts,
    }
  end

  def update
    if @quiz.update(quiz_params)
      render json: {
        status: 'SUCCESS',
        data: @quiz,
      }
    else
      render json: {
        status: 'SUCCESS',
        message: 'Not updated',
        data: @quiz.errors,
      }
    end
  end

  def destroy
    quiz = @quiz.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the post',
      data: quiz,
    }
  end

  def tag
    quiz_tags = @quiz.quiz_tags
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz tags',
      quiz_tags_data: quiz_tags,
    }
  end

  def weekly_ranking
    rank_in_quizzes_hash = []
    rank_in_quizzes = Quiz.where(created_at: Time.current.all_week)
    rank_in_quizzes.each do |rank_in_quiz|
      bookmark_count = QuizBookmark.where(quiz_id: rank_in_quiz.id).length
      create_user = User.where(id: rank_in_quiz.user_id)
      if bookmark_count > 2
        rank_in_quizzes_hash.push({
          rank_in_quiz_data: rank_in_quiz,
          create_user_name: create_user.first.user_name,
          create_user_image: create_user.first.image.url,
          create_user_title: create_user.first.nickname,
          bookmark_count: bookmark_count,
        })
      end
    end
    rank_in_quizzes_hash.sort! { |a, b| b[:bookmark_count] <=> a[:bookmark_count] }
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz weekly ranking',
      rank_in_quiz_data: rank_in_quizzes_hash,
    }
  end

  private

  def set_quiz
    @quiz = Quiz.find(params[:id])
  end

  def quiz_params
    params.require(:quiz).permit(
      :quiz_title,
      :quiz_introduction,
      :quiz_type,
      :user_id,
    )
  end
end
