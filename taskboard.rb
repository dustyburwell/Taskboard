require 'sinatra'

get '/' do
  send_file 'taskboard.html'  
end