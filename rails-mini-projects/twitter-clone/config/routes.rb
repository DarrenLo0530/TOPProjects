Rails.application.routes.draw do  
  devise_for :users, controllers: {registrations: 'registrations'}

  #Fixes reloading issue for failed validation
  devise_scope :user do
    get 'users/password', to: 'devise/passwords#new'
  end
  

  resources :tweets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "tweets#index"
  
end
