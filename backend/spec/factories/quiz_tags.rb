FactoryBot.define do
  factory :quiz_tag do
    tag { "add" }
    quiz { FactoryBot.create(:quiz) }
  end
end
