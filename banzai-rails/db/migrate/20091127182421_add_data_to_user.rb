class AddDataToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :admin,          :boolean, :default => false
    add_column :users, :consent_status, :boolean 
    add_column :users, :chosen,         :boolean 
    add_column :users, :phonenumber,    :string 
  end

  def self.down
    remove_column :users, :admin
    remove_column :users, :consent_status
    remove_column :users, :chosen
    remove_column :users, :phonenumber
  end
end
