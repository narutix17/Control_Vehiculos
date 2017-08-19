const  express = require('express');
const  passport = require('passport');
const  Publicidad = require('../models/Publicidad');
const  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Publicidad.find( function(err, data){
        res.json(data);
    });
});

router.delete('/:id', function(req, res, next) {
    Publicidad.find({id: req.params.id}).remove().exec();
});

function updatePublicidad(req, res, next){
    Publicidad.findOne({id : req.body.updateId}, function(err, publicidad){
        publicidad.nombre = req.body.pubName;
        publicidad.region = req.body.pubRegion;
        publicidad.url_publicidad = req.body.pubUrl;
        publicidad.save(function(err){
            return res.send(err);
        });
    }
}

router.post('/', function(req, res, next){

    if (req.body._method === "put"){
      updatePublicidad(req, res, next);
      return;
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

      res.redirect("../publicidad");
    });
});


module.exports = router;
