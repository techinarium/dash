class CreateWidgetInstalls < ActiveRecord::Migration[5.1]
  def change
    create_table :widget_installs do |t|
      t.references :user, foreign_key: true
      t.references :widget, foreign_key: true

      t.timestamps
    end
  end
end
