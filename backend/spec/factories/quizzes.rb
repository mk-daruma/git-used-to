FactoryBot.define do
  factory :quiz do
    user { FactoryBot.create(:user) }
    quiz_title { Faker::Alphanumeric.alpha(number: 5) }
    quiz_introduction { Faker::Alphanumeric.alpha(number: 30) }
    quiz_type { "first" }
  end
end
