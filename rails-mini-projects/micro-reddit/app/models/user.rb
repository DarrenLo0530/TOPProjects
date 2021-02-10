class User < ApplicationRecord
  has_many :posts
  has_many :comments
  
  validates :username, :email, presence: true

  validates :username,
    length: {minimum: 3, maximum: 20},
    format: {with: /\A[\w\d]+\z/},
    uniqueness: true

  validates :email,
    format: {with: /[\w]+@[a-z]+\.[a-z]{1,63}/},
    uniqueness: true

  validates :description,
    length: {maximum: 2000}

    

end
