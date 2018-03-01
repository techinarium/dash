class Widget < ApplicationRecord
  has_many :screenshots
  has_many :widget_codes
  has_many :widget_installs
  has_many :widget_instances
  has_many :reviews
  has_many :screenshots, :dependent => :destroy
end
