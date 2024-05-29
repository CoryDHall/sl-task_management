# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

5.times do |i|
  Task.CreateReminder!(due_date: Date.today + (i - 1).days, title: Faker::Marketing.buzzwords.capitalize, description: Faker::Lorem.sentence)
  Task.CreateTodo!(title: Faker::Hobby.activity, description: Faker::Lorem.sentence)
  Task.CreateLog!(title: Faker::Hobby.activity, date: Faker::Date.between(from: 1.year.ago, to: Date.today.prev_day))
end
