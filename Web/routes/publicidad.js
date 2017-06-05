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

router.post('/', function(req, res, next){
    var publicidad = new Publicidad({
        id: 3,
        nombre: req.body["pubName"],
        region: req.body["pubRegion"],
        url_imagen: req.body["pubImgUrl"],
        url_publicidad: req.body["pubUrl"],
        ancho: 112,
        alto: 30,
        fechaAgregada: "05/06/2017"
    });

    publicidad.save(function(err){
        if (err){
            return handleError(err);
        }
    });

    res.redirect("../publicidad");
});


module.exports = router;
