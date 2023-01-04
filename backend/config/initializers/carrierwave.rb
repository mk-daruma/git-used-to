require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage = :fog
    config.fog_public = false
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'git-used-to-web'
    config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/git-used-to-web'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region: 'ap-northeast-1'
    }
    config.cache_storage = :fog
  else
    config.asset_host = "http://localhost:3001"
    config.storage = :file
    config.cache_storage = :file
  end
end
