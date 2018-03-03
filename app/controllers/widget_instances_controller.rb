class WidgetInstancesController < ApplicationController
  before_action :confirm_login
  before_action :set_widget_instance, only: [:show, :edit, :update, :destroy]

  # GET /widget_instances
  # GET /widget_instances.json
  def index
    # List all widget instances, but only for the current user.
    @widget_instances = WidgetInstance.where(user_id: current_user.id)
  end

  # GET /widget_instances/1
  # GET /widget_instances/1.json
  def show
  end

  # GET /widget_instances/new
  def new
    @widget_instance = WidgetInstance.new
  end

  # GET /widget_instances/1/edit
  def edit
  end

  # POST /widget_instances
  # POST /widget_instances.json
  def create
    parameters = {
      user_id: current_user.id,
      widget_id: widget_instance_params['widget_id'],
      version: widget_instance_params['version'] || 1,
      data: widget_instance_params['data'] || {}
    }
    
    @widget_instance = WidgetInstance.new(parameters)

    respond_to do |format|
      if @widget_instance.save
        format.html { redirect_to @widget_instance, notice: 'Widget instance was successfully created.' }
        format.json { render :show, status: :created, location: @widget_instance }
      else
        format.html { render :new }
        format.json { render json: @widget_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /widget_instances/1
  # PATCH/PUT /widget_instances/1.json
  def update
    respond_to do |format|
      if @widget_instance.update(widget_instance_params) && @widget_instance.update(data: params[:widget_instance][:data])
        format.html { redirect_to @widget_instance, notice: 'Widget instance was successfully updated.' }
        format.json { render json: @widget_instance, status: 200 }
      else
        format.html { render :edit }
        format.json { render json: @widget_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widget_instances/1
  # DELETE /widget_instances/1.json
  def destroy
    @widget_instance.destroy
    respond_to do |format|
      format.html { redirect_to widget_instances_url, notice: 'Widget instance was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_widget_instance
      @widget_instance = WidgetInstance.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def widget_instance_params
      params.require(:widget_instance)
            .permit(:widget_id, :size_x, :size_y, :coord_x, :coord_y, :data, :version)
    end
end
