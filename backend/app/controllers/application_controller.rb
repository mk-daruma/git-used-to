class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :execption
  before_action :skip_session
  skip_before_action :verify_authenticity_token, if: :devise_controller?

  protected
    def
      request.session_options[:skip] = true
    end
end