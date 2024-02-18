var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all order detail records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT orderdetail_id, order_id, product_id, saleprice, qty FROM orderdetail";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('orderdetail/allrecords', { allrecs: result });
        }
    });
});

// ==================================================
// Route to view one specific order detail record. Notice the view is one record
// URL: http://localhost:3003/orderdetail/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT orderdetail_id, order_id, product_id, saleprice, qty FROM orderdetail WHERE orderdetail_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('orderdetail/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user for adding a new order detail.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('orderdetail/addrec');
});

// ==================================================
// Route to obtain user input and save it in the database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO orderdetail (order_id, product_id, saleprice, qty) VALUES (?, ?, ?, ?)";
    
    db.query(insertquery, [
        req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/orderdetail');
        }
    });
});

// ==================================================
// Route to delete one specific order detail record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM orderdetail WHERE orderdetail_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/orderdetail');
        }
    });
});

module.exports = router;
