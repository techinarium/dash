class DashboardController < ApplicationController
  before_action :confirm_login

  def index
    @my_widgets = current_user.widgets.where(deleted: false)
    @installed_widgets = WidgetInstall.where(user_id: current_user.id)
  end
end
