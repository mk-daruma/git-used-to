FactoryBot.define do
  factory :quiz_commit_message do
    quiz_branch { FactoryBot.create(:quiz_branch) }
    quiz_commit_message { Faker::Game.title }
  end
end
