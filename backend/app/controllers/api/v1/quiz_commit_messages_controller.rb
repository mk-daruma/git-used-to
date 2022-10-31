class Api::V1::QuizCommitMessagesController < ApplicationController
  before_action :set_quiz_commit_message, only: [:show, :destroy]

  def create
    quiz_commit_message_hash = []
    params.require(:_json).map do |param|
      quiz_commit_message = QuizCommitMessage.new(
        param.permit(
          :quiz_commit_message,
          :quiz_branch_id,
        ).to_h
      )
      if quiz_commit_message.save
        quiz_commit_message_hash.push(quiz_commit_message)
      else
        render json: quiz_commit_message.errors
        return
      end
    end
    render json: {
      status: 'SUCCESS',
      data: quiz_commit_message_hash,
    }
  end

  def show
    quiz_repository_files = @quiz_commit_message.quiz_repository_files
    quiz_history_of_committed_files = @quiz_commit_message.quiz_history_of_committed_files
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quizzes',
      data_repository_files: quiz_repository_files,
      data_history_of_committed_files: quiz_history_of_committed_files,
    }
  end

  def destroy
    quiz_commit_message = @quiz_commit_message.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the post',
      data: quiz_commit_message,
    }
  end

  private

  def set_quiz_commit_message
    @quiz_commit_message = QuizCommitMessage.find(params[:id])
  end
end
