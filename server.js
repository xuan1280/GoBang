const express = require('express');
const bodyParser = require('body-parser');
const readJsonSync = require('read-json-sync');

var path = require('path');
var fs = require('fs');

const app = express();
const port = 3001;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Parse POST data as JSON
app.use(bodyParser.json());  

// Listen for HTTP requests on port 3000
app.listen(port, () => {
console.log('listening on %d', port);
});

app.put('/putChessOrder', function (req, res, next) {
	var array = JSON.parse(readJsonSync('record.json'));
	array.push(req.body);
	console.log(array); 
	//writeFile('record.json', JSON.stringify(array));
	
	res.send(req.body);
	
});

app.get("/getWinnerHistory" , function (req, res, next) {
	res.json(readJsonSync('record.json'));
});



var writeFile = function (filename, data) {
	fs.writeFileSync(filename, data, function (err) {
		if (err)
			console.log(err);
		else
			console.log('Write operation complete.');
	});
};



 

