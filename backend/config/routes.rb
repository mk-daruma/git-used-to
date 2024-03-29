Rails.application.routes.draw do
  get '/health_check', to: 'health_checks#index'

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      devise_scope :api_v1_user do
        namespace :auth do
          resources :sessions, only: %i[index]
          post "guest_sign_in", to: "sessions#guest_sign_in"
        end
      end

      resources :users, only: %i[index show update] do
        member do
          get :profile
          get :self_bookmarked
          post :give_title
        end
        collection do
          get :user_ranking
        end
      end
      resources :quizzes, only: %i[index create update show destroy] do
        member do
          get :tag
        end
        collection do
          get :weekly_ranking
          post :lesson_quizzes
        end
      end
      resources :quiz_answer_records, only: %i[create]
      resources :quiz_bookmarks, only: %i[index create destroy]
      resources :quiz_comments, only: %i[index create destroy]
      resources :quiz_tags, only: %i[index create destroy]
      resources :quiz_first_or_lasts, only: %i[create show destroy]
      resources :quiz_branches, only: %i[create show update destroy]
      resources :quiz_remote_branches, only: %i[create show destroy]
      resources :quiz_commit_messages, only: %i[create show destroy]
      resources :quiz_remote_commit_messages, only: %i[create show destroy]
      resources :quiz_index_files, only: %i[create update destroy]
      resources :quiz_worktree_files, only: %i[create update destroy]
      resources :quiz_repository_files, only: %i[create destroy]
      resources :quiz_remote_repository_files, only: %i[create destroy]
      resources :quiz_history_of_committed_files, only: %i[create destroy]
    end
  end
end
