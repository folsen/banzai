require 'digest/sha1'

class User < ActiveRecord::Base
  include Authentication
  include Authentication::ByPassword
  include Authentication::ByCookieToken

  validates_presence_of     :login
  validates_length_of       :login,    :within => 3..40
  validates_uniqueness_of   :login
  validates_format_of       :login,    :with => Authentication.login_regex, :message => Authentication.bad_login_message

  validates_format_of       :name,     :with => Authentication.name_regex,  :message => Authentication.bad_name_message, :allow_nil => true
  validates_length_of       :name,     :maximum => 100

  validates_presence_of     :email
  validates_length_of       :email,    :within => 6..100 #r@a.wk
  validates_uniqueness_of   :email
  validates_format_of       :email,    :with => Authentication.email_regex, :message => Authentication.bad_email_message

  has_many :registrations
  has_many :games, :through => :registrations
  has_many :scores
  has_many :locations

  # HACK HACK HACK -- how to do attr_accessible from here?
  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  attr_accessible :login, :email, :name, :phonenumber, :password, :password_confirmation

  def self.chosen_for_game(game)
    game.users.find_by_chosen(true)
  end
  
  def location
    return self.locations.last
  end
  
  def get_score_for_game(game)
    score = self.scores.find_or_create_by_game_id(game.id)
    #This should be replaced by a default value in the database
    if score.score.nil?
      score.update_attributes(:score => 0)
    end
    return score
  end

  def score_for(game)
    @score = self.scores.find_by_game_id(game.id)
    if @score.nil?
      return 0
    else
      return @score.score
    end
  end
  
  def distance_from(other_user)
    if other_user.nil?
      return "There is no chosen one yet"
    end
    (self.locations.last.distance_from(other_user.locations.last) * 1000).round.to_s + "m"
  end

  def longitude
    if locations.empty?
      return 0
    end
    return self.locations.last.longitude
  end
  
  def latitude
    if locations.empty?
      return 0
    end
    
    return self.locations.last.latitude
  end

  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  #
  # uff.  this is really an authorization, not authentication routine.  
  # We really need a Dispatch Chain here or something.
  # This will also let us return a human error message.
  #
  def self.authenticate(login, password)
    return nil if login.blank? || password.blank?
    u = find_by_login(login.downcase) # need to get the salt
    u && u.authenticated?(password) ? u : nil
  end

  def login=(value)
    write_attribute :login, (value ? value.downcase : nil)
  end

  def email=(value)
    write_attribute :email, (value ? value.downcase : nil)
  end

  protected
    


end
