class Api::V1::QuizBookmarksController < ApplicationController
  before_action :quiz_bookmark_params, only: [:create]
  before_action :set_quiz_bookmark, only: [:destroy]

  def index
    quiz_bookmarks = QuizBookmark.preload(:quiz)
    render json: {
      status: 'SUCCESS',
      message: 'Loaded quiz bookmarks',
      data: quiz_bookmarks,
    }
  end

  def create
    quiz_bookmarks = QuizBookmark.new(quiz_bookmark_params)
    if QuizBookmark.exists?(
      user_id: quiz_bookmark_params[:user_id],
      quiz_id: quiz_bookmark_params[:quiz_id],
    )
      render json: {
        status: "SUCCESS",
        messaeg: "既に解答済みのデータは存在しています。",
      }
    elsif quiz_bookmarks.save
      render json: {
        status: 'SUCCESS',
        data: quiz_bookmarks,
      }
    else
      render json: quiz_bookmarks.errors
    end
  end

  def destroy
    quiz_bookmark = @quiz_bookmark.destroy
    render json: {
      status: 'SUCCESS',
      message: 'Deleted the quiz bookmark',
      data: quiz_bookmark,
    }
  end

  private

  def set_quiz_bookmark
    @quiz_bookmark = QuizBookmark.find(params[:id])
  end

  def quiz_bookmark_params
    params.require(:quiz_bookmark).permit(:user_id, :quiz_id)
  end
end
