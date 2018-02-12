# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Generate entries for widget tables

Widget.destroy_all
WidgetCode.destroy_all

(1..20).each do |i|
  widget = Widget.create(
                     widget_name: "Widget #{i}",
                     logo_url: "https://picsum.photos/100/100/?image=#{i}",
                     description: "Description goes here"
  )

  if widget.save
    (1..rand(10)).each do |j|
      widget.widget_codes.create(
                             widget_code: "{code_stuff: 'code stuff'}",
                             version: j,
                             published: rand < 0.5
      )
      widget.save!
    end
  end
end
