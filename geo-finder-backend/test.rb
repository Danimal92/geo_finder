require 'rest-client'

puts RestClient.get('http://jservice.io/api/categories',headers={})

