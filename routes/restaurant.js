var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all restaurant records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT restaurant_id, name, cuisine_type, location, delivery_time FROM restaurant";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('restaurant/allrecords', { allrecs: result });
        }
    });
});

// ==================================================
// Route to view one specific restaurant record. Notice the view is one record
// URL: http://localhost:3003/restaurant/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT restaurant_id, name, cuisine_type, location, delivery_time FROM restaurant WHERE restaurant_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('restaurant/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user for adding a new restaurant.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('restaurant/addrec');
});

// ==================================================
// Route to obtain user input and save it in the database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO restaurant (name, cuisine_type, location, delivery_time) VALUES (?, ?, ?, ?)";
    
    db.query(insertquery, [
        req.body.name, req.body.cuisine_type, req.body.location, req.body.delivery_time
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/restaurant');
        }
    });
});

// ==================================================
// Route to delete one specific restaurant record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM restaurant WHERE restaurant_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/restaurant');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT restaurant_id, name, cuisine_type, location, delivery_time FROM restaurant WHERE restaurant_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('restaurant/editrec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in the database.
// ==================================================
router.post('/save', function (req, res, next) {
    // restaurant_id, name, cuisine_type, location, delivery_time
    let updatequery = "UPDATE restaurant SET name = ?, cuisine_type = ?, location = ?, delivery_time = ? WHERE restaurant_id = ?";
    
    db.query(updatequery, [
        req.body.name, req.body.cuisine_type, req.body.location, req.body.delivery_time, req.body.restaurant_id, req.body.restaurant_id
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/restaurant');
        }
    });
});




module.exports = router;
