class CreateScreenshots < ActiveRecord::Migration[5.1]
  def change
    create_table :screenshots do |t|
      t.string :screenshot_url
      t.references :widget, foreign_key: true

      t.timestamps
    end
  end
end
