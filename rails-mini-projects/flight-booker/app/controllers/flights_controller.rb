class FlightsController < ApplicationController
  def index
    @airport_options = Airport.all.map {|airport| [airport.code, airport.id]}
    @take_off_time_options = Flight.all.map {|flight| [flight.take_off_formatted , flight.id]}
    @num_passengers_options = (1..4).map {|num_passengers| [num_passengers, num_passengers]}
    
    if params[:origin].present?
      @selected_flights = Flight.where(id: params[:take_off], origin_id: params[:origin], destination_id: params[:destination])
      @num_passengers = params[:num_passengers] 
    else
      @selected_flights = Flight.none
      @num_passengers = 0
    end
  end
end
