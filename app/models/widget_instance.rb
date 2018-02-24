class WidgetInstance < ApplicationRecord
  belongs_to :user
  belongs_to :widget

  def dashboard_coords
    {
      x: self.coord_x,
      y: self.coord_y,
    }
  end
end
