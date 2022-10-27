FactoryBot.define do
  factory :quiz_remote_repository_file do
    quiz_remote_repository_file_name { Faker::Alphanumeric.alpha(number: 5) }
    quiz_remote_repository_file_text_status { Faker::Alphanumeric.alpha(number: 5) }
    quiz_remote_branch { FactoryBot.create(:quiz_remote_branch) }
    quiz_remote_commit_message { FactoryBot.create(:quiz_remote_commit_message) }
  end
end
