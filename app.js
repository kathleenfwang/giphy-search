var express = require('express'); 
var http = require('http'); 
var app = express(); 
var giphy = require('giphy-api')();

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-gif',function (req,res) {
	var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
	res.render('hello-gif',{gifUrl: gifUrl})
})

app.use(express.static('public')) //where the browser will get your static assists like css 

/*app.get('/', function (req, res) {
 

    var body = '';

    response.on('data', function(d) {
     
      body += d;
    });

    response.on('end', function() {
      
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data})
    });
  });

 
})
*/ 
app.get('/', function (req, res) {
  var queryString = req.query.term; 
   
  if (queryString === undefined) { giphy.trending(function (error, response) { res.render('home', {gifs: response.data}); }); }
   else { giphy.search( {
   	q:queryString
   
   }, function (error, response) 
   	{ res.render('home', {gifs: response.data}); }); }
});
app.listen(3000, function() {
	console.log('Gif Search listening on port local host:3000')
})