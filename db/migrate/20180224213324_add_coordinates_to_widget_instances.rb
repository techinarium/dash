class AddCoordinatesToWidgetInstances < ActiveRecord::Migration[5.1]
  def change
    add_column :widget_instances, :coord_x, :integer
    add_column :widget_instances, :coord_y, :integer
  end
end