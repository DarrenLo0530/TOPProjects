class Post < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :title, :body, :user_id, presence: true
  validates :title,
    length: {maximum: 100}
    
  validates :body,
    length: {maximum: 10000}
end
