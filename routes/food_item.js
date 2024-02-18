var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all food item records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT food_item_id, name, cuisine_type, price, ingredients, availability FROM food_item";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('food_item/allrecords', { allrecs: result });
    });
});

// ==================================================
// Route to view one specific food item record.
// URL: http://localhost:3003/food_item/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT food_item_id, name, cuisine_type, price, ingredients, availability FROM food_item WHERE food_item_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('food_item/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user for a new food item.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('food_item/addrec');
});

// ==================================================
// Route to obtain user input and save it in the database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO food_item (name, cuisine_type, price, ingredients, availability) VALUES (?, ?, ?, ?, ?)";
    
    db.query(insertquery, [req.body.name, req.body.cuisine_type, req.body.price,
    req.body.ingredients, req.body.availability], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/food_item');
        }
    });
});

// ==================================================
// Route to delete one specific food item record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM food_item WHERE food_item_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/food_item');
        }
    });
});

module.exports = router;
