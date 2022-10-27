FactoryBot.define do
  factory :quiz_remote_branch do
    quiz_remote_branch_name { Faker::Alphanumeric.alpha(number: 5) }
    quiz_first_or_last { FactoryBot.create(:quiz_first_or_last) }
  end
end
