class KittensController < ApplicationController
  before_action :set_kitten, only: [:show, :edit, :update, :destroy]
  before_action :set_form_options, only: [:new, :edit]
  before_action :sanitize_kitten_params, only: [:create, :update]

  def index
    @kittens = Kitten.all
    respond_to do |format|
      format.html
      format.json { render json: @kittens }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @kitten }
    end
  end 
  
  def new
    @kitten = Kitten.new
  end 
  
  def create
    @kitten = Kitten.new(kitten_params)
    if @kitten.save
      redirect_to kitten_path(@kitten), notice: "Succesfully saved"
    else
      flash.now.notice = "Error in saving"
      render :new
    end
  end
  
  def edit
  end
  
  def update
    if @kitten.update(kitten_params)
      redirect_to kitten_path(@kitten), notice: "Succesfully updated!"
    else
      flash.now.notice = "Error in updating"
      render :edit
    end
  end
  
  def destroy
    @kitten.destroy
    redirect_to root_path, notice: "Succesfully deleted kitten!"
  end

  private

  def set_kitten
    @kitten = Kitten.find(params[:id])
  end

  def sanitize_kitten_params
    params[:age] = params[:age].to_i
    params[:cuteness] = params[:cuteness].to_i
    params[:softness] = params[:softness].to_i
  end

  def kitten_params
    params.require(:kitten).permit(:name, :age, :cuteness, :softness)
  end

  def set_form_options
    @rating_options = (0..10).map{|rating| [rating, rating]}
    @age_options = (0..20).map{|age| [age, age]}
  end
end
