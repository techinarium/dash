class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable, :confirmable

  has_many :widget_installs
  has_many :widget_instances

  protected

  # Turn off confirmation - for development only
  #def confirmation_required?
  #  false
  #end
end
