FactoryBot.define do
  factory :quiz_comment do
    quiz { FactoryBot.create(:quiz) }
    user { FactoryBot.create(:user) }
    comment { Faker::Alphanumeric.alpha(number: 30) }
  end
end
