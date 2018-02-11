class WidgetCodesController < ApplicationController
  before_action :confirm_login
  before_action :set_widget_code, only: [:show, :edit, :update, :destroy]

  # GET /widget_codes
  # GET /widget_codes.json
  def index
    @widget_codes = WidgetCode.all
  end

  # GET /widget_codes/1
  # GET /widget_codes/1.json
  def show
  end

  # GET /widget_codes/new
  def new
    @widget_code = WidgetCode.new
  end

  # GET /widget_codes/1/edit
  def edit
  end

  # POST /widget_codes
  # POST /widget_codes.json
  def create
    @widget_code = WidgetCode.new(widget_code_params)

    respond_to do |format|
      if @widget_code.save
        format.html { redirect_to @widget_code, notice: 'Widget code was successfully created.' }
        format.json { render :show, status: :created, location: @widget_code }
      else
        format.html { render :new }
        format.json { render json: @widget_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /widget_codes/1
  # PATCH/PUT /widget_codes/1.json
  def update
    respond_to do |format|
      if @widget_code.update(widget_code_params)
        format.html { redirect_to @widget_code, notice: 'Widget code was successfully updated.' }
        format.json { render :show, status: :ok, location: @widget_code }
      else
        format.html { render :edit }
        format.json { render json: @widget_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /widget_codes/1
  # DELETE /widget_codes/1.json
  def destroy
    @widget_code.destroy
    respond_to do |format|
      format.html { redirect_to widget_codes_url, notice: 'Widget code was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_widget_code
      @widget_code = WidgetCode.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def widget_code_params
      params.require(:widget_code).permit(:widget_code, :version, :widget_id, :published)
    end
end
