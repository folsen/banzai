class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.datetime :starts_at
      t.integer :rounds
      t.string :city

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
