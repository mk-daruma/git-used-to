FactoryBot.define do
  factory :quiz_history_of_committed_file do
    quiz_history_of_committed_files_name { "MyString" }
    quiz_history_of_committed_files_text_status { "MyString" }
    quiz_history_of_committed_files_past_text_status { "MyString" }
    quiz_history_of_committed_files_parent_past_commit_message { "MyText" }
    quiz_branch { nil }
    quiz_commit_message { nil }
  end
end
