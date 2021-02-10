class Flight < ApplicationRecord
  belongs_to :origin, class_name: "Airport"
  belongs_to :destination, class_name: "Airport"
  has_many :bookings, dependent: :destroy

  validates :origin, :destination, :take_off, :flight_duration, presence: true

  def take_off_formatted
    take_off.strftime("%d/%m/%Y - %I:%M %p")
  end
 
  def flight_duration_formatted
    hours = flight_duration/(60*60)
    minutes = (flight_duration/60) % 60
    seconds = flight_duration % 60
    [hours, minutes, seconds].map {|times| times.round.to_s.rjust(2, "0")}
                             .join(":")
  end
end
