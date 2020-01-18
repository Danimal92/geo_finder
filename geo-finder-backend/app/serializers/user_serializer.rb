class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :points, :summaries
  
end
