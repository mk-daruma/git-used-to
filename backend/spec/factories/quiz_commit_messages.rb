FactoryBot.define do
  factory :quiz_commit_message do
    quiz_branch { nil }
    quiz_commit_message { "MyText" }
  end
end
