var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let query = "SELECT product_id, prodimage, productname, description, ingredients, package_id, category_id, saleprice, status FROM product where homepage = 1";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }


    let query = "SELECT promotitle, promoimage from promotion where startdate <= current_date() and enddate >= current_date()";

    db.query(query, (err, result2) => {
      if (err) {
        console.log(err);
        res.render('error');
      }


      res.render('index', { allrecs: result, promos: result2 });
    });
  });
});

module.exports = router;
