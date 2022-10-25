class Api::V1::QuizIndexFilesController < ApplicationController
  before_action :set_quiz_index_file, only: [:update, :destroy]
  before_action :quiz_index_file_params, only: [:update]

  def create
    quiz_index_file_hash = []
    params.require(:_json).map do |param|
      quiz_index_file = QuizIndexFile.new(
        param.permit(
          :quiz_index_file_name,
          :quiz_index_file_text_status,
          :quiz_branch_id,
        ).to_h
      )
      if quiz_index_file.save
        quiz_index_file_hash.push(quiz_index_file)
      else
        render json: quiz_index_file.errors
        return
      end
    end
    render json: {
      status: 'SUCCESS',
      data: quiz_index_file_hash,
    }
  end

  def update
    if @quiz_index_file.update(quiz_index_file_params)
      render json: {
        status: 'SUCCESS',
        data: @quiz_index_file,
      }
    else
      render json: {
        status: 'SUCCESS',
        message: 'Not updated',
        data: @quiz_index_file.errors,
      }
    end
  end

  def destroy
    quiz_index_file = @quiz_index_file.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the post',
      data: quiz_index_file,
    }
  end

  private

  def set_quiz_index_file
    @quiz_index_file = QuizIndexFile.find(params[:id])
  end

  def quiz_index_file_params
    params.require(:quiz_index_file).permit(
      :quiz_index_file_name,
      :quiz_index_file_text_status,
      :quiz_branch_id,
    )
  end
end
