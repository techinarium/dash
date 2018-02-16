class AdminController < ApplicationController
  before_action :set_user, only: [:publish_ban, :login_ban]
  before_action :confirm_login, :confirm_admin

  def index
    @users = User.all
  end

  def publish_ban
    @user.publish_banned = (@user.publish_banned ? false : true)
    @user.save
    redirect_to admin_path
  end

  def login_ban
    @user.login_banned = (@user.login_banned ? false : true)
    @user.save
    redirect_to admin_path
  end

  private
  def confirm_admin
    unless current_user.admin
      redirect_to root_path
    end
  end

  def set_user
    @user = User.find(params[:id])
  end
end
