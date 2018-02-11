/** APP CONNECTIONS
**********************************************/
const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  app = express();

/** APP CONFIGURATION
**********************************************/
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


/** DATABASE SETUP
**********************************************/
mongoose.connect('mongodb://localhost/finance', { useMongoClient: true });

var financeSchema = new mongoose.Schema({
	name: String,
	category: String,
	created: { type: Date, default: Date.now },
	amount: Number	
});

var Finance = mongoose.model('Finance', financeSchema);

// Finance.create(
// 	{
// 		name: 'Flying Hound',
// 		category: 'Restaurant',
// 		amount: 28.00
// 	}, function(err, transaction) {
// 		if(err) {
// 			console.log(error);
// 		} else {
// 			console.log('New transaction!');
// 			console.log(transaction);
// 		}
// 	});



/** HOME PAGE
**********************************************/
app.get('/', function(req, res) {
	res.redirect('/finance');
});


/** INDEX PAGE
**********************************************/
app.get('/finance', function(req, res) {	
	Finance.find({}, function(err, newTransaction){
		if (err) {
			console.log(err);
		} else {
			res.render('index', {transactions: newTransaction})	;
		}		
	});
});

app.get('/finance/new', function(req, res){
	Finance.create({});
});

app.listen(3000, function() {
	console.log('Aye Aye Captin!');
});