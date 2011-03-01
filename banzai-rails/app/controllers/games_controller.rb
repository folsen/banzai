class GamesController < ApplicationController
  before_filter :login_required
  # GET /games
  # GET /games.xml
  def index
    @games = Game.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @games }
    end
  end

  # GET /games/1
  # GET /games/1.xml
  def show
    @game = Game.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @game }
    end
  end
  
  # GET /games/1/register
  def register
    @game = Game.find(params[:id])
    if @game.users.include?(current_user)
      flash[:error] = "You are already registered for this game."
    else
      @game.users << current_user
      flash[:notice] = "Congratulations, you are now registered for the game."
    end
    redirect_to games_path
  end
  
  #GET /games/1/players
  def players
    @game = Game.find(params[:id])
    results = []
    @game.users.each do |user|
      results << {:login => user.login, :longitude => user.longitude, :latitude => user.latitude}
    end
    render :json => results.to_json
  end

end
