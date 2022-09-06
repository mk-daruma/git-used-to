FactoryBot.define do
  factory :quiz do
    user { nil }
    quiz_title { "MyString" }
    quiz_introduction { "MyText" }
    quiz_type { "MyString" }
  end
end
