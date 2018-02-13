class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable, :confirmable

  has_many :widget_installs
  has_many :widget_instances
  has_many :widgets
  has_many :reviews

  protected

  # Turn off confirmation - for development only
  def confirmation_required?
   false
  end
end
