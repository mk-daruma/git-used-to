FactoryBot.define do
  factory :user do
    user_name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/images/sample.jpeg')) }
  end
end
