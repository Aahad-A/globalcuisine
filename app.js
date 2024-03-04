var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts'); // Add this line to include the express-ejs-layouts module
const dotenv = require('dotenv'); // Add this line to include the dotenv module
dotenv.config();

const mariadb = require('mariadb/callback');
const db = mariadb.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
  port: process.env.DB_PORT});
// connect to database
db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database due to error: " + err);
    res.render('error');
  } else {
    console.log('Connected to database');
  }
});
global.db = db;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about'); // Add this line to include the about.js file
var contactRouter = require('./routes/contact'); // Add this line to include the contact.js file
var privacyRouter = require('./routes/privacy'); // Add this line to include the privacy.js file
var helpRouter = require('./routes/help'); // Add this line to include the help.js file
var productRouter = require('./routes/product'); // 
var customerRouter = require('./routes/customer'); // Add this line to include the customer.js file
var categoryRouter = require('./routes/category'); // Add this line to include the category.js file
var foodRouter = require('./routes/food_item'); // Add this line to include the food.js file
var orderdetailRouter = require('./routes/orderdetail'); // Add this line to include the orderdetail.js file
var recipeRouter = require('./routes/recipe_package')
var reviewRouter = require('./routes/review')
var restaurantRouter = require('./routes/restaurant')
var searchRouter = require('./routes/search')
var reportsRouter = require('./routes/report')
const e = require('express');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(layouts); // Add this line to include the express-ejs-layouts module

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter); // Add this line to include the about.js file
app.use('/contact', contactRouter); // Add this line to include the contact.js file
app.use('/privacy', privacyRouter); // Add this line to include the privacy.js file
app.use('/help', helpRouter); // Add this line to include the help.js file
app.use('/product', productRouter); // 
app.use('/customer', customerRouter); // 
app.use('/category', categoryRouter); // 
app.use('/food_item', foodRouter); // 
app.use('/orderdetail', orderdetailRouter); // 
app.use('/recipe_package', recipeRouter); // Add this line to include the recipe.js file
app.use('/review', reviewRouter); // Add this line to include the review.js file
app.use('/restaurant', restaurantRouter); // Add this line to include the restaurant.js file
app.use('/search', searchRouter); // Add this line to include the search.js file
app.use('/report', reportsRouter); // Add this line to include the report.js file

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
