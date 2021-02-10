class BookingsController < ApplicationController
  def new
    @booking = Booking.new
    @flight = Flight.find(params[:flight_id])
    params[:num_passengers].to_i.times { @booking.passengers.build }
  end

  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      #Send an email to each passenger
      @booking.passengers.each do |passenger| 
        PassengerMailer.thank_you_email(passenger).deliver_now
      end
      #Display success message and redirect
      flash.now[:success] = "Succesfully booked a flight!"
      redirect_to booking_path(@booking)
    else
      flash.now[:error] = "Missing fields!"
      render :new
    end
  end

  def show
    @booking = Booking.find(params[:id])
  end

  private
  def booking_params
    params.require(:booking).permit(:flight_id,
      passengers_attributes: [:first_name, :last_name, :email]
    )
  end
end
