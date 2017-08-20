const  express = require('express');
const  passport = require('passport');
const  Publicidad = require('../models/Publicidad');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname);
	}
})
var upload = multer({storage: storage});
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

router.post('/', upload.single('upl'), function(req, res, next){

    console.log(req.body.pubName);
    console.log(req.body);

    if (req.body._method === "put"){
      updatePublicidad(req, res, next);
      return;
    }

    fs.readFile('uploads/upl', 'utf-8', function(err,data){
      if (err){
        return console.log(err);
      }
    });

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

      res.redirect("../publicidad?success=1");
    });
});


module.exports = router;
