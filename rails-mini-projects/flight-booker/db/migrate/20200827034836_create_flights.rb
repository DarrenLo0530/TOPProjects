class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.references :origin, foreign_key: {to_table: :airports}
      t.references :destination, foreign_key: {to_table: :airports}
      t.datetime :take_off
      t.integer :flight_duration
      t.timestamps
    end
  end
end
