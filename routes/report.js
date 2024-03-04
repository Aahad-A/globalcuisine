var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    res.render('report/reportmenu')

});

// Customer Listing
// /report/custlist
router.get('/custlist', function (req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address1, address2, city, state, zip FROM customer";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/custlist', { allrecs: result });
    });
});

// Product Listing
// /report/prodlist
router.get('/prodlist', function (req, res, next) {
    let query = "SELECT product_id, productname, description, ingredients, package_id, category_id, saleprice, status, homepage FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/prodlist', { allrecs: result });
    });
});

// Sale Listing
// /report/salelist
router.get('/salelist', function (req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/salelist', { allrecs: result });
    });
});

module.exports = router;