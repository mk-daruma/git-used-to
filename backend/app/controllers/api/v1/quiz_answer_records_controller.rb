class Api::V1::QuizAnswerRecordsController < ApplicationController
  before_action :quiz_answer_record_params, only: [:create]

  def create
    quiz_answer_records = QuizAnswerRecord.new(quiz_answer_record_params)
    if QuizAnswerRecord.exists?(
      user_id: quiz_answer_record_params[:user_id],
      quiz_id: quiz_answer_record_params[:quiz_id],
    )
      render json: {
        status: "SUCCESS",
        messaeg: "既に解答済みのデータは存在しています。",
      }
    elsif quiz_answer_records.save
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
