class Widget < ApplicationRecord
  has_many :screenshots
  has_many :widget_codes
  has_many :widget_installs
end