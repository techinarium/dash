class CreateWidgetInstances < ActiveRecord::Migration[5.1]
  def change
    create_table :widget_instances do |t|
      t.references :user, foreign_key: true
      t.references :widget, foreign_key: true
      t.text :data

      t.timestamps
    end
  end
end
