class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :user_name)
  end
end
