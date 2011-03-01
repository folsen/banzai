class AddHasStartedToGame < ActiveRecord::Migration
  def self.up
    add_column :games, :has_started, :boolean, :default => false
  end

  def self.down
    remove_column :games, :has_started
  end
end
