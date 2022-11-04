FactoryBot.define do
  factory :quiz_bookmark do
    quiz { FactoryBot.create(:quiz) }
    user { FactoryBot.create(:user) }
  end
end
