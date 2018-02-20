class SessionsController < Devise::SessionsController

protected
  def after_sign_in_path_for(resource)
    if resource.is_a?(User) && resource.login_banned?
      sign_out resource
      flash[:notice] = "Account banned."
      root_path
    else
      super
    end
  end
end
