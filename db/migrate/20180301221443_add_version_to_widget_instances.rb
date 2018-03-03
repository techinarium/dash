class AddVersionToWidgetInstances < ActiveRecord::Migration[5.1]
  def change
    add_column :widget_instances, :version, :integer
  end
end
