require 'net/http'
require 'uri'
puts "Scoring has started"
while true
  Net::HTTP.get_print URI.parse('http://banz.ai/admin/score')
  sleep 30
end
