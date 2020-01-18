class User < ApplicationRecord
    has_many :summaries
    
    # validates :email, presence: true
    # validates :email, format: /@/
    # validates :email, uniqueness: true
    
end
