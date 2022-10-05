FactoryBot.define do
  factory :quiz_remote_repository_file do
    quiz_remote_repository_file_name { "MyString" }
    quiz_repository_file_text_status { "MyString" }
    quiz_remote_commit_message { nil }
  end
end
