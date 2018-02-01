class CreateWidgets < ActiveRecord::Migration[5.1]
  def change
    create_table :widgets do |t|
      t.string :widget_name
      t.string :logo_url
      t.text :description

      t.timestamps
    end
  end
end
