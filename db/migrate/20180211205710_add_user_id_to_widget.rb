class AddUserIdToWidget < ActiveRecord::Migration[5.1]
  def change
    add_column :widgets, :user_id, :integer
  end
end
