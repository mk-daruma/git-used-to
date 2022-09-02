class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update]

  def edit
  end

  def update
    @user.user_name = user_params[:user_name]
    @user.user_self_introduction = user_params[:user_self_introduction]
    @user.image = user_params[:image] if user_params[:image] != ""

    if @user.save
      render json: { status: 200, data: @user }
    else
      render json: { status: 500, message: '更新に失敗しました' }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:user_name, :user_self_introduction, :image, :id)
  end
end
