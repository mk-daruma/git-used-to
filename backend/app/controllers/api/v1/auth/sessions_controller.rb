class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def index
    if current_api_v1_user
      render json: {
        is_login: true,
        data: current_api_v1_user,
      }
    else
      render json: {
        is_login: false,
        message: "ユーザーが存在しません",
      }
    end
  end

  def guest_sign_in
    @resource = User.guest
    @resource.user_name = "guestuser"
    @resource.user_self_introduction = "これは自己紹介用のフォームです。ぜひアカウントを作成してご自身の自己紹介をしてみてください！"
    @resource.email = "guest_user@git-used-to.com"
    @resource.password = "guestusergitusedto"
    @resource.nickname = "git-used-to見習い"
    @token = @resource.create_token
    @resource.save!
    render_create_success
  end
end
