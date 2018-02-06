class AddPublishedToWidgetCodes < ActiveRecord::Migration[5.1]
  def change
    add_column :widget_codes, :published, :boolean
  end
end
