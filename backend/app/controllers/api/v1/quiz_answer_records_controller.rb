class Api::V1::QuizAnswerRecordsController < ApplicationController
  before_action :quiz_answer_record_params, only: [:create]

  def create
    quiz_answer_records = QuizAnswerRecord.new(quiz_answer_record_params)
    if quiz_answer_records.save!
      render json: {
        status: 'SUCCESS',
        data: quiz_answer_records,
      }
    else
      render json: quiz_answer_records.errors
    end
  end

  private

  def quiz_answer_record_params
    params.require(:quiz_answer_record).permit(:user_id, :quiz_id)
  end
end
