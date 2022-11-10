class Api::V1::QuizCommentController < ApplicationController
  before_action :quiz_comment_params, only: [:create]
  before_action :set_quiz_comment, only: [:destroy]

  def index
    quiz_comments = QuizComment.preload(:quiz)
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz comments',
      data: quiz_comments,
    }
  end

  def create
    quiz_comments = QuizComment.new(quiz_comment_params)
    if quiz_comments.save
      render json: {
        status: 'SUCCESS',
        data: quiz_comments,
      }
    else
      render json: quiz_comments.errors
    end
  end

  def destroy
    quiz_comment = @quiz_comment.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the quiz comment',
      data: quiz_comment,
    }
  end

  private

  def set_quiz_comment
    @quiz_comment = QuizComment.find(params[:id])
  end

  def quiz_comment_params
    params.require(:quiz_comment).permit(:user_id, :quiz_id, :comment)
  end
end
