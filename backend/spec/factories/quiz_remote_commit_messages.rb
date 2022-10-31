FactoryBot.define do
  factory :quiz_remote_commit_message do
    quiz_remote_commit_message { Faker::Alphanumeric.alpha(number: 5) }
    quiz_remote_branch { FactoryBot.create(:quiz_remote_branch) }
  end
end
