class WidgetInstallsController < ApplicationController
  before_action :confirm_login
  before_action :set_widget_install, only: [:destroy]

  # GET /widget_installs
  # GET /widget_installs.json
  def index
    @widget_installs = WidgetInstall.all
  end

  # GET /widget_installs/1
  # GET /widget_installs/1.json
  def show
  end

  # GET /widget_installs/new
  def new
    @widget_install = WidgetInstall.new
  end

  # GET /widget_installs/1/edit
  def edit
  end

  # POST /widget_installs
  # POST /widget_installs.json
  def create
    @widget = Widget.find(params[:widget_id])
    @widget_install = @widget.widget_installs.create
    @widget_install.widget_id = @widget.id
    @widget_install.user_id = current_user.id

    respond_to do |format|
      if @widget_install.save
        # format.html { redirect_to @widget_install, notice: 'Widget install was successfully created.' }
        format.html { redirect_to widget_path(@widget), notice: 'Widget was successfully installed.' }
        format.json { render :show, status: :created, location: @widget_install }
      else
        # format.html { render :new }
        format.html { redirect_to widget_path(@widget), error: 'An issue occurred. Widget was not installed.' }
        format.json { render json: @widget_install.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /widget_installs/1
  # PATCH/PUT /widget_installs/1.json
  def update
    respond_to do |format|
      if @widget_install.update(widget_install_params)
        format.html { redirect_to @widget_install, notice: 'Widget install was successfully updated.' }
        format.json { render :show, status: :ok, location: @widget_install }
      else
        format.html { render :edit }
        format.json { render json: @widget_install.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widget_installs/1
  # DELETE /widget_installs/1.json
  def destroy
    @widget = Widget.find(@widget_install.widget_id)
    @widget_install.widget.widget_instances.where(user_id: :user_id).destroy_all
    @widget_install.destroy
    respond_to do |format|
      # format.html { redirect_to widget_installs_url, notice: 'Widget install was successfully destroyed.' }
      format.html { redirect_to widget_path(@widget), notice: 'Widget was successfully uninstalled.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_widget_install
      @widget_install = WidgetInstall.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def widget_install_params
      params.require(:widget_install).permit(:user_id, :widget_id)
    end
end
