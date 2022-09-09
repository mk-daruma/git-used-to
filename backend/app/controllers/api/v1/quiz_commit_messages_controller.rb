class Api::V1::QuizCommitMessagesController < ApplicationController
  before_action :set_quiz_commit_message, only: [:show, :update, :destroy]
  before_action :quiz_commit_message_params, only: [:create, :update]

  def create
    quiz_commit_message = QuizCommitMessage.new(quiz_commit_message_params)
    if quiz_commit_message.save
      render json: { status: 'SUCCESS', data: quiz_commit_message }
    else
      render json: quiz_commit_message.errors
    end
  end

  def show
    quiz_repository_files = @quiz_commit_message.quiz_repository_files
    render json: { status: 'SUCCESS', message: 'Loaded quizzes', data: quiz_repository_files }
  end

  def update
    if @quiz_commit_message.update(quiz_commit_message_params)
      render json: { status: 'SUCCESS', data: @quiz_commit_message }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: @quiz_commit_message.errors }
    end
  end

  def destroy
    quiz_commit_message = @quiz_commit_message.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_commit_message }
  end

  private

  def set_quiz_commit_message
    @quiz_commit_message = QuizCommitMessage.find(params[:id])
  end

  def quiz_commit_message_params
    params.require(:quiz_commit_message).permit(:quiz_commit_message, :quiz_branch_id)
  end
end
