# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Destroy widget code first or the database complains
# about its referential integrity.
Review.destroy_all
Screenshot.destroy_all
WidgetInstance.destroy_all
WidgetInstall.destroy_all
WidgetCode.destroy_all
Widget.destroy_all

# Generate an admin account
if User.where(email: "admin@email.com").first.nil?
  user = User.new(
      :email                 => "admin@email.com",
      :password              => "123456",
      :password_confirmation => "123456",
      :admin                 => true
  )
  user.skip_confirmation!
  user.save!
end

# Find a user account to tie widget authorship to
widget_author_id = User.first.id

# Set default widget code content
widget_code_content = <<-CONTENT
Dash.widget('v0', widget => {
	widget.layout({
		name: 'main',
		size: '2x2',
		default: true,
		render() {
			return widget.element.text('Hello, world!')
		}
	})
})
CONTENT

# Generate entries for widget tables
(1..20).each do |w|
  # Create widgets
  widget = Widget.create(
      widget_name: "Widget #{w}",
      logo_url: "https://picsum.photos/100/100/?image=#{rand(50)}",
      description: Faker::Lorem.words.join(" ").capitalize,
      user_id: widget_author_id
  )

  if widget.save
    # Create widget code versions
    rand(1..10).times do |c|
      widget.widget_codes.create(
          widget_code: widget_code_content,
          version: c,
          published: rand < 0.5
      )
      widget.save!
    end

    # Create widget screenshots
    # NOT WORKING - need to update for Paperclip compatibility
    # rand(5).times do
    #   widget.screenshots.create(
    #       screenshot_url: "https://picsum.photos/600/600/?image=#{rand(20)}"
    #   )
    #   widget.save!
    # end

    # Create widget reviews
    rand(5).times do |r|
      widget.reviews.create(
          widget_id: widget.id,
          review_text: Faker::Lorem.paragraph,
          user_id: widget_author_id,
          rating: rand(1..5)
      )
      widget.save!
    end
  end
end
