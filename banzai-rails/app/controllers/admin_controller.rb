require 'net/http'
require 'uri'

class AdminController < ApplicationController
  
  #An API key should be implemented in this method
  def score
    @games = Game.find(:all, :conditions => {:has_started => true})
    @games.each do |game|
      chosen = User.chosen_for_game(game)
      if chosen.nil? 
        #dont handle this properly right now, just render nothing with status 200
        render :nothing => true
      end
      
      locations_within_catching_distance = Location.find(:all, :origin => [chosen.latitude, chosen.longitude], :within => 0.2, :conditions => ["user_id != ?", chosen.id])
      players_within_catching_distance = locations_within_catching_distance.map{|loc| loc.user }.uniq
      
      if players_within_catching_distance == game.users.count - 1
        #chosen is caught, end round and start next
        #for now – just close the game and declare a winner
        game.update_attributes(:has_started => false)
        game.users.each do |user|
          Net::HTTP.post_form(URI.parse('http://mwl.labs.ericsson.net/mwlservice/resource/consent/revoke'),
                                        { 'applicationID'=>'BANZAI3', 
                                          'devKey'=>'NmisMAlwJWM09jktLs9LkgriQxB6Gso1BoVSv6D6',
                                          'msisdn' => user.phonenumber})
        end
        #SEND SMS to winner to say that he won
      else
        #deal out points
        chosen_score = chosen.get_score_for_game(game)
        chosen_score.update_attributes(:score => chosen_score.score + 10)
        
        game.users.find_all_by_chosen(false) do |player|
          player_score = player.get_score_for_game(game)
          distance_to_chosen = player.distance_from(chosen).to_i
          player_score.update_attributes(:score => player_score.score + (20*fractional_distance(distance_to_chosen)).to_i)
        end        
      end
    end
    if @games.empty?
      render :text => "There were no running games"
    else
      render :text => "Updated scores successfully at " + Time.now.to_s
    end
  end
  
  protected
  
  def fractional_distance(meters)
    if meters.to_i > 1500
      return 0
    elsif meters.to_i < 200
      return 1
    else
      return (1500-meters.to_i)/1500
    end
  end
  
end
