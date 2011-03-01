module GamesHelper
  def percentage_distance(meters)
    if meters.to_i > 1500
      return 0
    elsif meters.to_i < 200
      return 100
    else
      return 100*(1500-meters.to_i)/1500
    end
  end
end