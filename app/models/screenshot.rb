class Screenshot < ActiveRecord::Base
  belongs_to :widget
  before_save :default_values
  attr_accessor :image_file_name

  has_attached_file :image,
  :path => "screenshots/:filename",
  :url  => ":s3_path_url"

  do_not_validate_attachment_file_type :image

  def default_values
    self.screenshot_url = self.image.url
  end

  def url
    if self.image.url == "/images/original/missing.png"
      self.screenshot_url
    else
      "https:" + self.image.url
    end
  end
end
