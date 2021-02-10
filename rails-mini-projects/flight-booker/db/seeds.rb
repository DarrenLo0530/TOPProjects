# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Clears previous seed
Airport.destroy_all
Flight.destroy_all

#Generate airports
Airport.create([{code: "SFO"}, {code: "NYC"}])

#Generate flights
Flight.create(origin: Airport.first, destination: Airport.second, take_off: DateTime.new(2020, 10, 1, 10, 10), flight_duration: 14400)
Flight.create(origin: Airport.second, destination: Airport.first, take_off: DateTime.new(2020, 11, 3, 23, 10), flight_duration: 15000)
Flight.create(origin: Airport.second, destination: Airport.first, take_off: DateTime.new(2020, 12, 10, 17, 10), flight_duration: 14450)
Flight.create(origin: Airport.first, destination: Airport.second, take_off: DateTime.new(2020, 9, 30, 3, 10), flight_duration: 14430)