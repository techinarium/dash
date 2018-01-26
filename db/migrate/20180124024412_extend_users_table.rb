class ExtendUsersTable < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :admin, :boolean, default: false
    add_column :users, :publish_banned, :boolean, default: false
    add_column :users, :login_banned, :boolean, default: false
    add_column :users, :full_name, :string
    add_column :users, :user_name, :string
    add_column :users, :company, :string
  end
end
