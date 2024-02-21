Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
        resources :tasks
    end
  end

  get 'tasks', to: 'home#index'
  get 'tasks/new', to: 'home#index'
  get 'tasks/:id', to: 'home#index'
  get 'tasks/:id/edit', to: 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
end
