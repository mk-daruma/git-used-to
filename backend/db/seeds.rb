# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  user_name: 'admin_user',
  user_self_introduction: "管理者用のuserです。",
  email: ENV['ADMIN_USER_ADDRESS'],
  confirmed_at: Date.today,
  password: ENV['ADMIN_USER_PASSWORD']
)
