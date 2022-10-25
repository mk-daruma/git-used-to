class Api::V1::QuizHistoryOfCommittedFilesController < ApplicationController
  before_action :set_quiz_history_of_committed_file, only: [:destroy]

  def create
    quiz_history_of_committed_file_hash = []
    params.require(:_json).map do |param|
      quiz_history_of_committed_file = QuizHistoryOfCommittedFile.new(param.permit(:quiz_history_of_committed_file_name, :quiz_history_of_committed_file_status, :quiz_history_of_committed_file_text_status, :quiz_history_of_committed_file_past_text_status, :quiz_history_of_committed_file_parent_past_commit_message, :quiz_commit_message_id, :quiz_branch_id).to_h)
      if quiz_history_of_committed_file.save
        quiz_history_of_committed_file_hash.push(quiz_history_of_committed_file)
      else
        render json: quiz_history_of_committed_file.errors
        return
      end
    end
    render json: { status: 'SUCCESS', data: quiz_history_of_committed_file_hash }
  end

  def destroy
    quiz_history_of_committed_file = @quiz_history_of_committed_file.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_history_of_committed_file }
  end

  private

  def set_quiz_history_of_committed_file
    @quiz_history_of_committed_file = QuizHistoryOfCommittedFile.find(params[:id])
  end
end
