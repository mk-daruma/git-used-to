class Api::V1::QuizRemoteRepositoryFilesController < ApplicationController
  before_action :set_quiz_remote_repository_file, only: [:update, :destroy]
  before_action :quiz_remote_repository_file_params, only: [:update]

  def create
    quiz_remote_repository_file_hash = []
    params.require(:_json).map do |param|
      quiz_remote_repository_file = QuizRemoteRepositoryFile.new(param.permit(:quiz_remote_repository_file_name, :quiz_remote_repository_file_text_status ,:quiz_remote_commit_message_id, :quiz_remote_branch_id).to_h)
      if quiz_remote_repository_file.save
        quiz_remote_repository_file_hash.push(quiz_remote_repository_file)
      else
        render json: quiz_remote_repository_file.errors
        return
      end
    end
    render json: { status: 'SUCCESS', data: quiz_remote_repository_file_hash }
  end

  def update
    if @quiz_remote_repository_file.update(quiz_remote_repository_file_params)
      render json: { status: 'SUCCESS', data: @quiz_remote_repository_file }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: @quiz_remote_repository_file.errors }
    end
  end

  def destroy
    quiz_remote_repository_file = @quiz_remote_repository_file.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_remote_repository_file }
  end

  private

  def set_quiz_remote_repository_file
    @quiz_remote_repository_file = QuizRemoteRepositoryFile.find(params[:id])
  end

  def quiz_remote_repository_file_params
    params.require(:quiz_remote_repository_file).permit(:quiz_remote_repository_file_name, :quiz_remote_repository_file_text_status, :quiz_remote_commit_message_id)
  end
end
