What this is
============
Banzai was developed for a [Ericsson Labs programming contest](https://labs.ericsson.com/developer-community/blog/ericsson-labs-dreamhack) in 2009. By [Fredrik Olsen](http://ique.github.com) and [Emanuel Ferm](http://eferm.com/projects).

This is the source code for the *winning* entry to that competition. It is a proof-of-concept internet-based real life tag-game. It uses the Ericsson Labs API's to track players and display them on a map.

The entire project was produced in 16 consecutive hours of frenetic coding.

From the front-page of the application
--------------------------------------
*banzai* is all about the fun of the chase. It was originally designed
as an urban tag-game played out in real life. Because of the accuracy of the Ericsson Labs Web Location API
we switched our market to people with access to large areas to play around in while using some kind of
motor vehicle, the urban city-based game might be revised when the Web Location uses GPS to a larger extent.

The game is about finding "the chosen one". The game is initiated at a given time and place, you
choose which games you want to participate in yourself. Once the game is started you will get the location
of everyone else. Completely at random, one player will be informed that he is the chosen one. 
It is then the goal of the chosen one to stay away from everyone else.

The code
--------
The application consists of a Ruby on Rails application that handles all the users and displaying all the data to the users, while a Java server feeds the database with positioning information about the players. These two components are divided up in *banzai-rails* and *banzai-server*.

The name banzai was chosen because I happened to own the domain name banz.ai