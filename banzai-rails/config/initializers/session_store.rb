# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_banzai_session',
  :secret      => '32bd651c6ad5ebe763fbf90033213a07aebb2163f543d8cb88f13b6cfbfba61c98542fb2e0129d8f46c1768c6680909db144d4393764b5b31340ffa9793b46f3'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
