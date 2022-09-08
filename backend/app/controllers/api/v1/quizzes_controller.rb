class Api::V1::QuizzesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :set_quiz, only: [:update, :destroy]

  def index
    quizzes = Quiz.all
    render json: { status: 'SUCCESS', message: 'Loaded quizzes', data: quizzes }
  end

  def create
    quiz = Quiz.new(quiz_params)
    if quiz.save
      render json: { status: 'SUCCESS', data: quiz }
    else
      render json: quiz.errors
    end
  end

  def update
    if @quiz.update(quiz_params)
      render json: { status: 'SUCCESS', data: @quiz }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: quiz.errors }
    end
  end

  def destroy
    quiz = @quiz.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz }
  end

  private

  def set_quiz
    @quiz = Quiz.find(params[:id])
  end

  def quiz_params
    params.require(:quiz).permit(:quiz_title, :quiz_introduction, :quiz_type, :user_id)
  end
end
