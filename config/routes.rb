Rails.application.routes.draw do
  resources :widget_installs
  resources :widget_codes
  resources :screenshots
  resources :widgets

  devise_for :users

  get 'dashboard/index'

  root 'dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
