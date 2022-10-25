class Api::V1::QuizRemoteBranchesController < ApplicationController
  before_action :set_quiz_remote_branch, only: [:show, :destroy]

  def create
    quiz_remote_branch_hash = []
    params.require(:_json).map do |param|
      quiz_remote_branch = QuizRemoteBranch.new(param.permit(:quiz_remote_branch_name, :quiz_first_or_last_id).to_h)
      if quiz_remote_branch.save
        quiz_remote_branch_hash.push(quiz_remote_branch)
      else
        render json: quiz_remote_branch.errors
        return
      end
    end
    render json: { status: 'SUCCESS', data: quiz_remote_branch_hash }
  end

  def show
    quiz_remote_commit_messages = @quiz_remote_branch.quiz_remote_commit_messages
    render json: { status: 'SUCCESS', message: 'Loaded quizzes', data_remote_messages: quiz_remote_commit_messages }
  end

  def destroy
    quiz_remote_branch = @quiz_remote_branch.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_remote_branch }
  end

  private

  def set_quiz_remote_branch
    @quiz_remote_branch = QuizRemoteBranch.find(params[:id])
  end
end
