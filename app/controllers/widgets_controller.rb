class WidgetsController < ApplicationController
  before_action :confirm_login
  before_action :set_widget, only: [:show, :edit, :update, :destroy]

  # GET /widgets
  # GET /widgets.json
  def index
    @widgets = Widget.where(deleted: false) # Don't actually delete or the database will complain about FK
                     .joins(:widget_codes)
                     .where('published = ?', true)
                     .uniq
  end

  # GET /widgets/1
  # GET /widgets/1.json
  def show
    @widget = Widget.find(params[:id])
    @widget_codes = @widget.widget_codes

    respond_to do |format|
      format.json do
        render json: {
          widget: @widget,
          codes: @widget_codes.reverse,
          instances: @widget.widget_instances.where(user_id: current_user.id)
        }
      end
      format.html { widgets_path(@widget) }
    end
  end

  # GET /widgets/new
  def new
    @widget = Widget.new
  end

  # GET /widgets/1/edit
  def edit
  end

  # POST /widgets
  # POST /widgets.json
  def create
    @widget = Widget.new(widget_params)
    @widget.user_id = current_user.id

    if @widget.save
      @widget.widget_codes.create(widget_code: "",
                                  version: 1,
                                  published: false)
    end

    respond_to do |format|
      if @widget.save
        format.html { redirect_to @widget, notice: 'Widget was successfully created.' }
        format.json {
          render json: {
            widget: @widget,
            codes: @widget.widget_codes
          },
          status: :created,
          location: @widget
        }
      else
        format.html { render :new }
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /widgets/1
  # PATCH/PUT /widgets/1.json
  def update
    respond_to do |format|
      if @widget.update(widget_params)
        if params[:images]
          params[:images].each { |image|
            @widget.screenshots.create(image: image)
          }
        end

        format.html { redirect_to @widget, notice: 'Widget was successfully updated.' }
        format.json { render :show, status: :ok, location: @widget }
      else
        format.html { render :edit }
        format.json { render json: @widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widgets/1
  # DELETE /widgets/1.json
  def destroy
    # Don't actually delete. Just mark as deleted.
    @widget.deleted = true

    respond_to do |format|
      if @widget.save
        format.html { redirect_to widgets_url, notice: 'Widget was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.json { render status: 500 }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_widget
      @widget = Widget.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def widget_params
      params.require(:widget).permit(:widget_name, :logo_url, :description, :screenshots)
    end
end
