FactoryBot.define do
  factory :quiz_branch do
    quiz_first_or_last { FactoryBot.create(:quiz_first_or_last) }
    quiz_branch_name { Faker::Alphanumeric.alpha(number: 5) }
  end
end
