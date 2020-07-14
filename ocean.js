const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require('fs')
const app = express();
const https = require('https')

const port = 4242;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('html'));


app.get('/ping',
	(req, res) =>
{
	res.sendStatus(200);
})

app.get('/:pagecode',
	(req, res) =>
{
	res.sendFile( (__dirname+'/index.html'));
});

var httpServer = http.createServer(app);
httpServer.listen(port, () => {
	console.log( "Ocean Planet running on "+ port );
})

var httpsOptions = null;
try {
	httpsOptions = {
	  key: fs.readFileSync(
	  	'/etc/letsencrypt/live/russduckworth.com/privkey.pem'
	  ),
	  cert: fs.readFileSync(
	  	'/etc/letsencrypt/live/russduckworth.com/cert.pem'
	  )
	}
} catch (e) {}


var httpsPort = 4243;

if (httpsOptions) {
	var httpsServer = https.createServer( httpsOptions, app);
	httpsServer.listen( httpsPort, () => {
			console.log( "Ocean Planet running secure on "+ httpsPort );
	});
}



