class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :review_text
      t.references :user, foreign_key: true
      t.references :widget, foreign_key: true

      t.timestamps
    end
  end
end
