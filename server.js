var twitter = require('ntwitter');

var app = require('http').createServer(handler);
app.listen(80);

/*----------------------------------
Config
-----------------------------------*/
var hashtag = "#HastTagToWatch";


// twitter oAuth details 
var twit = new twitter({
  consumer_key: 'xxxxx',
  consumer_secret: 'xxxxx',
  access_token_key: 'xxxx',
  access_token_secret: 'xxxxx'
});


// database credentials
var dbURL = "https://xxxx.com";
var dbPort = 443;
var dbUser = "xxxx";
var dbPass = "xxxx";
/*----------------------------------
Config
-----------------------------------*/


// http server
function handler (req, res) {
    res.writeHead(200);
    res.end('Watching twitter for '+hashtag+' Tweets');
}

// database connection
var cradle = require('cradle');
var connection = new(cradle.Connection)(dbURL, dbPort, { auth: { username: dbUser, password: dbPass }});
var db = connection.database('goldburns');

twit.stream('statuses/filter',{track:hashtag}, function(stream) {
  stream.on('data', function (data) {
	
	  db.save(data.id_str, {
		  id: data.id,
	      tweet: data.text,
		  name: data.user.name,
		  user: data.user.screen_name,
		  created_at: data.created_at
	  }, function (err, res) {
	      if (err) {
	          // Handle db save error
	      } else {
	          // Handle db save success
	          
	      }
	  }); // db save
  }); // stream.on data
}); // twit.stream

