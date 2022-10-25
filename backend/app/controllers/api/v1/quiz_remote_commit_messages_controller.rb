class Api::V1::QuizRemoteCommitMessagesController < ApplicationController
  before_action :set_quiz_remote_commit_message, only: [:show, :destroy]

  def create
    quiz_remote_commit_message_hash = []
    params.require(:_json).map do |param|
      quiz_remote_commit_message = QuizRemoteCommitMessage.new(param.permit(:quiz_remote_commit_message, :quiz_remote_branch_id).to_h)
      if quiz_remote_commit_message.save
        quiz_remote_commit_message_hash.push(quiz_remote_commit_message)
      else
        render json: quiz_remote_commit_message.errors
        return
      end
    end
    render json: { status: 'SUCCESS', data: quiz_remote_commit_message_hash }
  end

  def show
    quiz_remote_repository_files = @quiz_remote_commit_message.quiz_remote_repository_files
    render json: { status: 'SUCCESS', message: 'Loaded quizzes', data_remote_repository_files: quiz_remote_repository_files }
  end

  def destroy
    quiz_remote_commit_message = @quiz_remote_commit_message.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_remote_commit_message }
  end

  private

  def set_quiz_remote_commit_message
    @quiz_remote_commit_message = QuizRemoteCommitMessage.find(params[:id])
  end
end
