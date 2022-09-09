Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :users, only: %i[edit update]
      resources :quizzes, only: %i[index create update show destroy]
      resources :quiz_first_or_lasts, only: %i[create show update destroy]
      resources :quiz_branches, only: %i[create show update destroy]
      resources :quiz_commit_messages, only: %i[create show update destroy]
    end
  end
end
