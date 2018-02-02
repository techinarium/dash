class ChangeWidgetCodeVersionToInt < ActiveRecord::Migration[5.1]
  def change
    change_column :widget_codes, :version, :integer
  end
end
