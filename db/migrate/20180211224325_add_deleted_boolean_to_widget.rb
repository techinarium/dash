class AddDeletedBooleanToWidget < ActiveRecord::Migration[5.1]
  def change
    add_column :widgets, :deleted, :boolean, default: false
  end
end
