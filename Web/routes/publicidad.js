const  express = require('express');
const  passport = require('passport');
//const  Publicidad = require('../models/Publicidad');
const  router = express.Router();
var sqlserver = require('mssql');

var dbConfig = {
    user: 'sa',
    password: '12345678',
    server: 'localhost',
    database: 'control_vehiculos',
    port: 1433
};

/* GET home page. */
router.get('/', function(req, res, next) {
   //res.send("<h1>vales verga</h1>");
   sqlserver.connect(dbConfig, function() {
        var request = new sqlserver.Request();
        var sqlQuery = 'SELECT * FROM publicidad;'
        request.query(sqlQuery, function(err, recordset) {
            if(err) console.log(err);
            res.send(JSON.stringify(recordset)); // Result in JSON format
            sqlserver.close();
        });
    });
});


router.get('/:id', function(req, res, next) {
   //res.send("<h1>vales verga</h1>");
   sqlserver.connect(dbConfig, function() {
        var request = new sqlserver.Request();
        var sqlQuery = "SELECT * FROM publicidad WHERE id="+req.params.id;
        console.log(sqlQuery);
        request.query(sqlQuery, function(err, recordset) {
            if(err) console.log(err);
            res.send(JSON.stringify(recordset)); // Result in JSON format
            sqlserver.close();
        });
    });
});


router.delete('/:id', function(req, res, next) {

    var id=req.params.id;
   sqlserver.connect(dbConfig, function() {
        var request = new sqlserver.Request();
        var sqlQuery = "DELETE FROM publicidad WHERE id = " + id ;
        request.query(sqlQuery, function(err, recordset) {
            if(err){ 
                console.log(err);
                res.send(err);
            }
            else{
                res.send(JSON.stringify(recordset)); // Result in JSON format
            }
            sqlserver.close();
        });
    });
});

router.post('/', function(req, res, next){
    //console.log(req);
    var nombre = req.body.nombre;
    var idRegion = req.body.idRegion;
    var url=req.body.url;
    var resParent=res;

   sqlserver.connect(dbConfig, function(req, res) {
            var request = new sqlserver.Request();
            var query="INSERT INTO publicidad (nombre,region,url) VALUES ('"+nombre+"',"+idRegion+",'"+url+"')";
            console.log(query);
            request.query(query, 
                function(err,result ) {
                    if (!err){
                        if (result.affectedRows != 0) {
                            console.log("GUARDADO");
                        }
                         else {
                            console.log("Result no found");
                         }
                         console.log("NO HUBO ERROR");
                        sqlserver.close();
                        resParent.status(200).send(JSON.stringify(result));

                    } else {
                        console.log("HUBO ERROR")
                        resParent.status(400).send(err); 
                    }
                        
                }
            );
    });

});


router.put('/:id', function(req, res, next){
    //console.log(req);
    var nombre = req.body.nombre;
    var id=req.params.id;
    var idRegion = req.body.idRegion;
    var url=req.body.url;
    var resParent=res;

   sqlserver.connect(dbConfig, function(req, res) {
            var request = new sqlserver.Request();
            var query="UPDATE publicidad SET nombre='"+nombre+"',region="+idRegion+",url='"+url+"' WHERE id="+id;
            console.log(query);
            request.query(query, 
                function(err,result ) {
                    if (!err){
                        if (result.affectedRows != 0) {
                            console.log("GUARDADO");
                        }
                         else {
                            console.log("Result no found");
                         }
                         console.log("NO HUBO ERROR");
                        sqlserver.close();
                        resParent.status(200).send(JSON.stringify(result));

                    } else {
                        console.log("HUBO ERROR")
                        resParent.status(400).send(err); 
                    }
                        
                }
            );
    });

});




module.exports = router;
