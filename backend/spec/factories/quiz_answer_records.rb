FactoryBot.define do
  factory :quiz_answer_record do
    user { FactoryBot.create(:user) }
    quiz { FactoryBot.create(:quiz) }
  end
end
