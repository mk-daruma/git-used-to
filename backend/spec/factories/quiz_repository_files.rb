FactoryBot.define do
  factory :quiz_repository_file do
    quiz_branch { FactoryBot.create(:quiz_branch) }
    quiz_commit_message { FactoryBot.create(:quiz_commit_message) }
    quiz_repository_file_name { Faker::Alphanumeric.alpha(number: 5) }
    quiz_repository_file_status { Faker::Alphanumeric.alpha(number: 5) }
    quiz_repository_file_text_status { Faker::Alphanumeric.alpha(number: 5) }
  end
end
