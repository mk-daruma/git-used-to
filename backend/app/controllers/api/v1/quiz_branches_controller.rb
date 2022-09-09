class Api::V1::QuizBranchesController < ApplicationController
  before_action :set_quiz_branch, only: [:show, :update, :destroy]
  before_action :quiz_branch_params, only: [:create, :update]

  def create
    quiz_branch = QuizBranch.new(quiz_branch_params)
    if quiz_branch.save
      render json: { status: 'SUCCESS', data: quiz_branch }
    else
      render json: quiz_branch.errors
    end
  end

  def show
    quiz_worktree_files = @quiz_branch.quiz_worktree_files
    quiz_commit_messages = @quiz_branch.quiz_commit_messages
    render json: { status: 'SUCCESS', message: 'Loaded quizzes', data_worktrees: quiz_worktree_files, data_messages: quiz_commit_messages }
  end

  def update
    if @quiz_branch.update(quiz_branch_params)
      render json: { status: 'SUCCESS', data: @quiz_branch }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: @quiz_branch.errors }
    end
  end

  def destroy
    quiz_branch = @quiz_branch.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: quiz_branch }
  end

  private

  def set_quiz_branch
    @quiz_branch = QuizBranch.find(params[:id])
  end

  def quiz_branch_params
    params.require(:quiz_branch).permit(:quiz_branch_name, :quiz_first_or_last_id)
  end
end
