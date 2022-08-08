Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV.fetch("TWITTER_KEY"), ENV.fetch("TWITTER_SECRET"), callback_url: "http://3000/omniauth/twitter/callback"
end
