FactoryBot.define do
  factory :quiz_first_or_last do
    quiz { FactoryBot.create(:quiz) }
    quiz_first_or_last_status { Faker::Alphanumeric.alpha(number: 5) }
  end
end
