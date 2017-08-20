const  express = require('express');
const  passport = require('passport');
const  User = require('../models/User');
const  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});


router.get('/login', function(req, res, next){
    res.render('login', { user: req.user });
  });

router.post('/login', passport.authenticate(
	'local', { successRedirect: '/publicidad',
            	failureRedirect: '/login'})
);

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.get('/publicidad', function(req, res, next){
    if (typeof (req.query.success)){
      var operation = req.query.success;
      if (operation == 1){
        return res.render('publicidad', { user: req.user, message: "Publicidad agregada con exito" });
      } else if (operation == 2) {
        return res.render('publicidad', { user: req.user, message: "Publicidad actualizada con exito" });
      }
    }
    res.render('publicidad', {user: req.user});
});


module.exports = router;
