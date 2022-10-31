class Api::V1::QuizWorktreeFilesController < ApplicationController
  before_action :set_quiz_worktree_file, only: [:update, :destroy]
  before_action :quiz_worktree_file_params, only: [:update]

  def create
    quiz_worktree_file_hash = []
    params.require(:_json).map do |param|
      quiz_worktree_file = QuizWorktreeFile.new(
        param.permit(
          :quiz_worktree_file_name,
          :quiz_worktree_file_text_status,
          :quiz_branch_id,
        ).to_h
      )
      if quiz_worktree_file.save
        quiz_worktree_file_hash.push(quiz_worktree_file)
      else
        render json: quiz_worktree_file.errors
        return
      end
    end
    render json: {
      status: 'SUCCESS',
      data: quiz_worktree_file_hash,
    }
  end

  def update
    if @quiz_worktree_file.update(quiz_worktree_file_params)
      render json: {
        status: 'SUCCESS',
        data: @quiz_worktree_file,
      }
    else
      render json: {
        status: 'SUCCESS',
        message: 'Not updated',
        data: @quiz_worktree_file.errors,
      }
    end
  end

  def destroy
    quiz_worktree_file = @quiz_worktree_file.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the post',
      data: quiz_worktree_file,
    }
  end

  private

  def set_quiz_worktree_file
    @quiz_worktree_file = QuizWorktreeFile.find(params[:id])
  end

  def quiz_worktree_file_params
    params.require(:quiz_worktree_file).permit(
      :quiz_worktree_file_name,
      :quiz_worktree_file_status,
      :quiz_worktree_file_text_status,
      :quiz_branch_id,
    )
  end
end
