class ReviewsController < ApplicationController
  before_action :confirm_login
  before_action :set_review, only: [:update, :destroy]

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
  end

  # GET /reviews/new
  def new
    @review = Review.new
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @widget = Widget.find(params[:widget_id])
    @review = @widget.reviews.build(review_params)
    @review.widget_id = @widget.id
    @review.user_id = current_user.id

    respond_to do |format|
      if @review.save
        # format.html { redirect_to @review, notice: 'Review was successfully created.' }
        format.html { redirect_to widget_path(@widget), notice: 'Your review was successfully submitted.' }
        format.json { render :show, status: :created, location: @review }
      else
        # format.html { render :new }
        format.html { redirect_to widget_path(@widget), error: 'An issue occurred. Your review was not submitted.' }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    @widget = Widget.find(params[:widget_id])
    respond_to do |format|
      if @review.update(review_params)
        format.html { redirect_to widget_path(@widget), notice: 'Your review was successfully updated.' }
        format.json { render :show, status: :ok, location: @review }
      else
        format.html { render :edit }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @widget = Widget.find(@review.widget_id)
    @review.destroy
    respond_to do |format|
      format.html { redirect_to widget_path(@widget), notice: 'Your review was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.require(:review).permit(:rating, :review_text, :user_id, :widget_id)
    end
end
