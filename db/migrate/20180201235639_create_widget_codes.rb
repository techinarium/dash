class CreateWidgetCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :widget_codes do |t|
      t.text :widget_code
      t.string :version
      t.references :widget, foreign_key: true

      t.timestamps
    end
  end
end
