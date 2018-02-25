class AddSizeToWidgetInstances < ActiveRecord::Migration[5.1]
  def change
    add_column :widget_instances, :size_x, :integer
    add_column :widget_instances, :size_y, :integer
  end
end
