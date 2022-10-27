FactoryBot.define do
  factory :user do
    user_name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
    # 画像のダミーデータ作成しテストする必要あり
    # image { Faker::Avatar.image }
  end
end
