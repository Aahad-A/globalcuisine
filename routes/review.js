var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all review records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT review_id, customer_id, food_item_id, package_id, rating, comment, date FROM review";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('review/allrecords', { allrecs: result });
        }
    });
});

// ==================================================
// Route to view one specific review record. Notice the view is one record
// URL: http://localhost:3003/review/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT review_id, customer_id, food_item_id, package_id, rating, comment, date FROM review WHERE review_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('review/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user for adding a new review.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('review/addrec');
});

// ==================================================
// Route to obtain user input and save it in the database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO review (customer_id, food_item_id, package_id, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(insertquery, [
        req.body.customer_id, req.body.food_item_id, req.body.package_id, req.body.rating, req.body.comment, new Date(req.body.date)
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});

// ==================================================
// Route to delete one specific review record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM review WHERE review_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});

module.exports = router;
