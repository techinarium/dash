class AddVersionToWidgetInstalls < ActiveRecord::Migration[5.1]
  def change
    add_column :widget_installs, :version, :integer
  end
end
