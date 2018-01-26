class AddColorsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :dark_theme, :boolean, default: false
    add_column :users, :accent_color, :string
  end
end
