const  express = require('express');
const  passport = require('passport');
const  User = require('../models/User');
const  router = express.Router();
var path = require('path');
var fs = require('fs');
var uid = require('uid2');
var mime = require('mime');
var TARGET_PATH = path.resolve(__dirname, '../uploads/');
var IMAGE_TYPES = ['image/jpeg', 'image/png'];
const  Publicidad = require('../models/Publicidad');

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

function updatePublicidad(req, res, next){
      if (req.files.upl.size != 0 ){
        var is;
        var os;
        var targetPath;
        var targetName;
        var tempPath = req.files.upl.path;
        //get the mime type of the file
        var type = mime.lookup(req.files.upl.path);
        //get the extension of the file
        var extension = req.files.upl.path.split(/[. ]+/).pop();

        //check to see if we support the file type
        if (IMAGE_TYPES.indexOf(type) == -1) {
          return res.status(415).render('publicidad', {user: req.user, message: 'El banner de la publicidad tiene que ser formato: jpeg, jpg, jpe, png.'});
        }

        //create a new name for the image
        targetName = uid(22) + '.' + extension;

        //determine the new path to save the image
        targetPath = path.join(TARGET_PATH, targetName);

        //create a read stream in order to read the file
        is = fs.createReadStream(tempPath);

        //create a write stream in order to write the a new file
        os = fs.createWriteStream(targetPath);

        is.pipe(os);

        //handle error
        is.on('error', function() {
          if (err) {
            return res.status(500).render('publicidad', {user: req.user, message: 'Algo salio mal. Vuelva a intentarlo mas tarde.'});
          }
        });

        //if we are done moving the file
        is.on('end', function() {

          //delete file from temp folder
          fs.unlink(tempPath, function(err) {
            if (err) {
              return res.status(500).render('publicidad', {user: req.user, message: 'Algo salio mal. Vuelva a intentarlo mas tarde.'});
            }

          });//#end - unlink
        });//#end - on.end

        Publicidad.findOne({id : req.body.pubId}, function(err, publicidad){
            publicidad.nombre = req.body.pubName;
            publicidad.region = req.body.pubRegion;
            publicidad.url_publicidad = req.body.pubUrl;
            publicidad.file_name = targetName;
            publicidad.save(function(err){
                if (err){
                  res.status(500).render('publicidad', {});
                }
                res.redirect('/publicidad?success=2');
            });
        });
      } else{
        Publicidad.findOne({id : req.body.pubId}, function(err, publicidad){
            publicidad.nombre = req.body.pubName;
            publicidad.region = req.body.pubRegion;
            publicidad.url_publicidad = req.body.pubUrl;
            publicidad.save(function(err){
                if (err){
                  res.status(500).render('publicidad', {});
                }
                res.redirect('/publicidad?success=2');
            });
        });
      }

}

router.post('/publicidad', function(req, res, next){

    if (req.body._method === "put"){
      updatePublicidad(req, res, next);
      return;
    }


    var is;
    var os;
    var targetPath;
    var targetName;
    var tempPath = req.files.upl.path;
    //get the mime type of the file
    var type = mime.lookup(req.files.upl.path);
    //get the extension of the file
    var extension = req.files.upl.path.split(/[. ]+/).pop();

    //check to see if we support the file type
    if (IMAGE_TYPES.indexOf(type) == -1) {
      return res.status(415).render('publicidad', {user: req.user, message: 'El banner de la publicidad tiene que ser formato: jpeg, jpg, jpe, png.'});
    }

    //create a new name for the image
    targetName = uid(22) + '.' + extension;

    //determine the new path to save the image
    targetPath = path.join(TARGET_PATH, targetName);

    //create a read stream in order to read the file
    is = fs.createReadStream(tempPath);

    //create a write stream in order to write the a new file
    os = fs.createWriteStream(targetPath);

    is.pipe(os);

    //handle error
    is.on('error', function() {
      if (err) {
        return res.status(500).render('publicidad', {user: req.user, message: 'Algo salio mal. Vuelva a intentarlo mas tarde.'});
      }
    });

    //if we are done moving the file
    is.on('end', function() {

      //delete file from temp folder
      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.status(500).render('publicidad', {user: req.user, message: 'Algo salio mal. Vuelva a intentarlo mas tarde.'});
        }

        Publicidad.find(function(err, data){
          var newId = Math.max.apply(Math, data.map(function(elem){return elem.id})) + 1 ;
          var publicidad = new Publicidad({
              id: newId,
              nombre: req.body.pubName,
              file_name: targetName,
              region: req.body.pubRegion,
              url_publicidad: req.body.pubUrl,
              fechaAgregada: new Date().toLocaleString()
          });

          publicidad.save(function(err){
              if (err){
                  return handleError(err);
              }
          });

          res.redirect('/publicidad?success=1');
        });
      });//#end - unlink
    });//#end - on.end
});


module.exports = router;
