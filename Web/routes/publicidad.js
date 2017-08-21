const  express = require('express');
const  passport = require('passport');
const  Publicidad = require('../models/Publicidad');
var path = require('path');
var fs = require('fs');
var uid = require('uid2');
var mime = require('mime');
var TARGET_PATH = path.resolve(__dirname, '../uploads/');
var IMAGE_TYPES = ['image/jpeg', 'image/png'];
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Publicidad.find( function(err, data){
        res.json(data);
    });
});

router.get('/:id', function(req, res, next) {
    Publicidad.findOne({id: req.params.id}, function(err, data){
        res.status(200).json(data);
    });
});

router.delete('/:id', function(req, res, next) {
    Publicidad.find({id: req.params.id}).remove().exec();
    res.status(200).json("Deleted Successfully")
});

function updatePublicidad(req, res, next){
    Publicidad.findOne({id : req.body.updateId}, function(err, publicidad){
        publicidad.nombre = req.body.pubName;
        publicidad.region = req.body.pubRegion;
        publicidad.url_publicidad = req.body.pubUrl;
        publicidad.save(function(err){
            return res.send(err);
        });
    });
}

router.post('/', function(req, res, next){

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
      return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
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
        return res.send(500, 'Something went wrong');
      }
    });

    //if we are done moving the file
    is.on('end', function() {

      //delete file from temp folder
      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }

        Publicidad.find(function(err, data){
          var newId = Math.max.apply(Math, data.map(function(elem){return elem.id})) + 1 ;
          var publicidad = new Publicidad({
              id: newId,
              nombre: req.body.pubName,
              region: req.body.pubRegion,
              url_publicidad: req.body.pubUrl,
              fechaAgregada: new Date()
          });

          publicidad.save(function(err){
              if (err){
                  return handleError(err);
              }
          });

          res.redirect('/publicidad?success=1')
        });
      });//#end - unlink
    });//#end - on.end
});


module.exports = router;
