class Api::V1::QuizCommentsController < ApplicationController
  before_action :quiz_comment_params, only: [:create]
  before_action :set_quiz_comment, only: [:destroy]

  def index
    quiz_comment_hash = []
    quiz_comments = QuizComment.preload(:quiz)
    quiz_comments.map do |comment|
      user = User.find(comment.user_id)
      quiz_comment_hash.push({
        comment: comment,
        commented_user_name: user.user_name,
        commented_user_image: user.image.url,
      })
    end
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz comments',
      data: quiz_comment_hash,
    }
  end

  def create
    quiz_comments = QuizComment.new(quiz_comment_params)
    if quiz_comments.save
      user = User.find(quiz_comments.user_id)
      render json: {
        status: 'SUCCESS',
        comment: quiz_comments,
        commented_user_name: user.user_name,
        commented_user_image: user.image.url,
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
