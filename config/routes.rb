Rails.application.routes.draw do
  resources :reviews
  resources :widget_instances
  resources :widget_installs
  resources :widget_codes
  resources :screenshots

  resources :widgets do
    resources :reviews
    resources :widget_installs
  end

  devise_for :users, controllers: {sessions: "sessions"}

  #get 'dashboard/index'
  get 'admin', to: 'admin#index'
  post 'publish_ban/:id', to: 'admin#publish_ban', as: 'publish_ban'
  post 'login_ban/:id', to: 'admin#login_ban', as: 'login_ban'

  root 'dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
