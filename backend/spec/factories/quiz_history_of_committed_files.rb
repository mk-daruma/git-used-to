FactoryBot.define do
  factory :quiz_history_of_committed_file do
    quiz_history_of_committed_file_name { Faker::Game.title }
    quiz_history_of_committed_file_text_status { Faker::Alphanumeric.alpha(number: 10) }
    quiz_history_of_committed_file_past_text_status { Faker::Alphanumeric.alpha(number: 10) }
    quiz_history_of_committed_file_parent_past_commit_message { Faker::Alphanumeric.alpha(number: 10) }
    quiz_branch { FactoryBot.create(:quiz_branch) }
    quiz_commit_message { FactoryBot.create(:quiz_commit_message) }
  end
end
