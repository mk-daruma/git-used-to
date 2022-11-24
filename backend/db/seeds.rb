# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  user_name: 'guest user',
  user_self_introduction: "これは自己紹介用のフォームです。ぜひアカウントを作成してご自身の自己紹介をしてみてください！",
  email: ENV['GEST_USER_ADRESS'],
  confirmed_at: Date.today,
  password: ENV['GEST_USER_PASSWORD']
)
