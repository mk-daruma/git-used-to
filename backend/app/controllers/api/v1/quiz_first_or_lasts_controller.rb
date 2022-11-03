class Api::V1::QuizFirstOrLastsController < ApplicationController
  before_action :set_quiz_first_or_last, only: [:show, :destroy]
  # before_action :quiz_first_or_last_params, only: [:create]

  def create
    quiz_first_or_last_hash = []
    params.require(:_json).map do |param|
      quiz_first_or_last = QuizFirstOrLast.new(
        param.permit(
          :quiz_first_or_last_status,
          :quiz_id,
        ).to_h
      )
      if quiz_first_or_last.save
        quiz_first_or_last_hash.push(quiz_first_or_last)
      else
        render json: quiz_first_or_last.errors
        return
      end
    end
    render json: {
      status: 'SUCCESS',
      data: quiz_first_or_last_hash,
    }
    # quiz_first_or_last = QuizFirstOrLast.new(quiz_first_or_last_params)
    # if quiz_first_or_last.save
    #   render json: {
    #     status: 'SUCCESS',
    #     data: quiz_first_or_last,
    #   }
    # else
    #   render json: quiz_first_or_last.errors
    # end
  end

  def show
    quiz_branches = @quiz_first_or_last.quiz_branches
    quiz_remote_branches = @quiz_first_or_last.quiz_remote_branches
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      data_branches: quiz_branches,
      data_remote_branches: quiz_remote_branches,
    }
  end

  def destroy
    quiz_first_or_last = @quiz_first_or_last.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the post',
      data: quiz_first_or_last,
    }
  end

  private

  def set_quiz_first_or_last
    @quiz_first_or_last = QuizFirstOrLast.find(params[:id])
  end

  # def quiz_first_or_last_params
  #   params.require(:quiz_first_or_last).permit(:quiz_first_or_last_status, :quiz_id)
  # end
end
