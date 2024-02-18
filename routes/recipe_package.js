var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all recipe package records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT package_id, name, cuisine_type, price, ingredients, shipping_address FROM recipe_package";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('recipe_package/allrecords', { allrecs: result });
        }
    });
});

// ==================================================
// Route to view one specific recipe package record. Notice the view is one record
// URL: http://localhost:3003/recipe_package/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT package_id, name, cuisine_type, price, ingredients, shipping_address FROM recipe_package WHERE package_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('recipe_package/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user for adding a new recipe package.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('recipe_package/addrec');
});

// ==================================================
// Route to obtain user input and save it in the database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO recipe_package (name, cuisine_type, price, ingredients, shipping_address) VALUES (?, ?, ?, ?, ?)";
    
    db.query(insertquery, [
        req.body.name, req.body.cuisine_type, req.body.price, req.body.ingredients, req.body.shipping_address
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/recipe_package');
        }
    });
});

// ==================================================
// Route to delete one specific recipe package record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM recipe_package WHERE package_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/recipe_package');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT package_id, name, cuisine_type, price, ingredients, shipping_address FROM recipe_package WHERE package_id = ?";
    // execute query with parameter to prevent SQL injection
    db.query(query, [req.params.recordid], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('recipe_package/editrec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in the database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE recipe_package SET name = ?, cuisine_type = ?, price = ?, ingredients = ?, shipping_address = ? WHERE package_id = ?";
    
    db.query(updatequery, [
        req.body.name, req.body.cuisine_type, req.body.price,
        req.body.ingredients, req.body.shipping_address, req.body.package_id
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/recipe_package');
        }
    });
});




module.exports = router;
