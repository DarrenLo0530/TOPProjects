class AddRelationBetweenFlightAndPassenger < ActiveRecord::Migration[5.2]
  def change
    add_reference :bookings, :flight, foreign_key: true
    add_reference :passengers, :booking, foreign_key: true

  end
end
