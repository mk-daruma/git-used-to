FactoryBot.define do
  factory :quiz_comment do
    quiz { nil }
    user { nil }
    comment { "MyText" }
  end
end
