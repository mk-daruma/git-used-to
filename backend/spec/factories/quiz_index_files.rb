FactoryBot.define do
  factory :quiz_index_file do
    quiz_index_file_name { Faker::Alphanumeric.alpha(number: 5) }
    quiz_index_file_text_status { Faker::Alphanumeric.alpha(number: 5) }
    quiz_branch { FactoryBot.create(:quiz_branch) }
  end
end
