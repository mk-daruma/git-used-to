class Api::V1::QuizTagsController < ApplicationController
  before_action :quiz_tag_params, only: [:create]
  before_action :set_quiz_tag, only: [:destroy]

  def index
    quiz_tags = QuizTag.preload(:quiz)
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz tags',
      data: quiz_tags,
    }
  end

  def create
    quiz_tags = QuizTag.new(quiz_tag_params)
    if quiz_tags.save
      render json: {
        status: 'SUCCESS',
        data: quiz_tags,
      }
    else
      render json: quiz_tags.errors
    end
  end

  def destroy
    quiz_tag = @quiz_tag.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the quiz tag',
      data: quiz_tag,
    }
  end

  private

  def set_quiz_tag
    @quiz_tag = QuizTag.find(params[:id])
  end

  def quiz_tag_params
    params.require(:quiz_tag).permit(:quiz_id, :tag)
  end
end
