FactoryBot.define do
  factory :quiz_worktree_file do
    quiz_branch { FactoryBot.create(:quiz_branch) }
    quiz_worktree_file_name { Faker::Alphanumeric.alpha(number: 5) }
    quiz_worktree_file_status { Faker::Alphanumeric.alpha(number: 5) }
    quiz_worktree_file_text_status { Faker::Alphanumeric.alpha(number: 5) }
  end
end
