/**
 * Archivo principal de la aplicacion. En este .js se instancia la base de datos.
 * Se crea la base de datos en caso de no existir, y se cargan las dependencias necesarias.
 * Version: 2.1
 * Creador: Leonardo Kuffo
 * Editores: Ruben Suarez
 */
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;


var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngCordova', 'chart.js'])

app.config(function($ionicConfigProvider, $sceDelegateProvider, $compileProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

/**
 * This method is excecuted when app starts running. Inside this function we create the Database. Every SQL execute command
 * is validated everytime the app opens, to avoid redundancy problems.
 */
app.run(function($ionicPlatform, $cordovaSQLite, $cordovaLocalNotification, $timeout, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    

       
    


    //$rootScope.size12 = localStorage.getItem("size12");
    /**
     *
     *
     * CREACION DE LA BASE DE DATOS
     *
     *
     */
    db = $cordovaSQLite.openDB({ name: "controlvehiculos.db", iosDatabaseLocation:'default'});

    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tipo_vehiculo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR (20) UNIQUE);").then(function(result){
        $cordovaSQLite.execute(db,"select * from tipo_vehiculo").then(function(result){
          if (result.rows.length==0) {
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["automovil"]);
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["camion"]);
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["taxi"]);
            console.log("seeee insertaron 3 tipos de vehiculoos");
          }
          else{
            console.log("tabla tipo_vehiculo ya tiene datos");

          }
        },function(error){

          console.log(error);

        });

      },function(error){
        console.log(error);

      });

      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS marca (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,nombre VARCHAR (20));").then(function(result){
        $cordovaSQLite.execute(db,"select * from marca").then(function(result){
          if (result.rows.length==0) {
            var query2="INSERT INTO marca VALUES (1,'SCANIA'),(2,'HINO'),(3,'CHEVROLET'),(4,'INTERNATIONAL'),(5,'VOLKSWAGEN'),(6,'HYUNDAI'),(7,'YUTONG'),(8,'MERCEDES BENZ'),(9,'AGRALE'),(10,'THOMAS BUILT '),(11,'VOLVO'),(12,'FARDIER'),(13,'GREAT WALL'),(14,'ZOTYE'),(15,'TOYOTA'),(16,'KIA'),(17,'FIAT'),(18,'MAZDA'),(19,'JEEP'),(20,'DODGE'),(21,'CHERY'),(22,'DONGFENG'),(23,'CITROEN'),(24,'NISSAN'),(25,'RENAULT'),(26,'FORD'),(27,'LIFAN'),(28,'FAW'),(29,'MITSUBISHI'),(30,'AUDI'),(31,'BMW'),(32,'PORSCHE'),(33,'MINI'),(34,'LAND ROVER'),(35,'BYD'),(36,'HONDA'),(37,'PEUGEOT'),(38,'UAZ'),(39,'KING LONG'),(40,'DFSK'),(41,'HIGER'),(42,'FOTON'),(43,'GOLDEN DRAGON'),(44,'JINBEI'),(45,'VENTURA'),(46,'JAC'),(47,'RAM'),(48,'CHANGHE'),(49,'TATA'),(50,'MAZDA');";
            var query="INSERT INTO marca VALUES (?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?);";
            var marcas=["SCANIA","HINO","CHEVROLET","INTERNATIONAL","VOLKSWAGEN","HYUNDAI","YUTONG","MERCEDES BENZ","AGRALE","THOMAS BUILT","VOLVO","FARDIER","GREAT WALL","ZOTYE","TOYOTA","KIA","FIAT","MAZDA","JEEP","DODGE","CHERY","DONGFENG","CITROEN","NISSAN","RENAULT","FORD","LIFAN","FAW","MITSUBISHI","AUDI","BMW","PORSCHE","MINI","LAND ROVER","BYD","HONDA","PEUGEOT","UAZ","KING LONG","DFSK","HIGER","FOTON","GOLDEN DRAGON","JINBEI","VENTURA","JAC","RAM","CHANGHE","TATA","MAZDA"];
            $cordovaSQLite.execute(db,query2).then(
              function(result){
                console.log("seeee insertaron"+marcas.length+" marcas de vehiculos");
              },function(error){
                console.log("ERROR AL INSERTAR MARCAS DE VEHICULO");
                console.log(error);
              });
          }
          else{
            console.log("tabla marca ya tiene datos");

          }
        },function(error){

          console.log(error);

        });

      },function(error){
        console.log(error);

      });

      $cordovaSQLite.execute(db,"CREATE TABLE if NOT EXISTS vehiculo ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, idTipo INTEGER NOT NULL REFERENCES tipo_vehiculo (id) ON DELETE CASCADE,idMarca INTEGER NOT NULL REFERENCES marca (id) ON DELETE CASCADE, color VARCHAR(10), placa VARCHAR (10) UNIQUE, marca VARCHAR (20), alias VARCHAR (20), año INTEGER (4), kilometraje INTEGER (7) NOT NULL, imagen TEXT);").then(function(result){
        console.log("SE HA CREADO TABLA VEHICULO");

      },function(error){
        console.log("ERROR AL CREAR TABLA VEHICULO");
        console.error(error);

      });

      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tipo_intervalo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,nombre VARCHAR (15) UNIQUE);").then(function(result){
        $cordovaSQLite.execute(db,"select * from tipo_intervalo").then(function(result){
          if (result.rows.length==0) {
            $cordovaSQLite.execute(db,"insert into tipo_intervalo (nombre) VALUES (?)",["tiempo"]);
            $cordovaSQLite.execute(db,"insert into tipo_intervalo (nombre) VALUES (?)",["kilometro"]);
            console.log("seeee insertaron colores");
          }
          else{
            console.log("tabla tipo_intervalo ya tiene datos");

          }
        },function(error){

          console.log(error);

        });

      },function(error){
        console.log(error);

      });
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tipo_servicio (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,nombre VARCHAR (20) UNIQUE);").then(function(result){
        $cordovaSQLite.execute(db,"select * from tipo_servicio").then(function(result){
          if (result.rows.length==0) {
            $cordovaSQLite.execute(db,"insert into tipo_servicio (nombre) VALUES (?)",["predeterminado"]);
            $cordovaSQLite.execute(db,"insert into tipo_servicio (nombre) VALUES (?)",["no predeterminado"]);
          }
          else{
            console.log("tabla tipo_servicio ya tiene datos");

          }
        },function(error){

          console.log(error);

        });

      },function(error){
        console.log(error);

      });

      var query = "SELECT * FROM servicios_predeterminados";
      $cordovaSQLite.execute(db, query).then(function(res){
        console.log("HUBO RESULTADOS");
        if (res.rows.length > 0){
          console.log(res.rows.item(1).nombre);
        }else{
          console.log("No hay Registros de SERV PREDETERMINADOS");
        }
      });


      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS servicios_predeterminados (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR(40), tipo_intervalo INTEGER NOT NULL REFERENCES tipo_vehiculo (id) ON DELETE CASCADE, intervalo INTEGER)").then(function(result){
          console.log("SE HA CREADO LA TABLA");
          $cordovaSQLite.execute(db,"select * from servicios_predeterminados").then(function(result){
            if (result.rows.length==0) {
              $cordovaSQLite.execute(db, "INSERT INTO servicios_predeterminados (nombre, tipo_intervalo, intervalo) VALUES ('Cambio de Aceite', 1, 5000) ");
              $cordovaSQLite.execute(db, "INSERT INTO servicios_predeterminados (nombre, tipo_intervalo, intervalo) VALUES ('Cambio de Agua de Bateria', 1, 1000) ");
              $cordovaSQLite.execute(db, "INSERT INTO servicios_predeterminados (nombre, tipo_intervalo, intervalo) VALUES ('Cambio de Mangueras', 1, 50000) ");
            }
            else{
              console.log("tabla servicios_predeterminados ya tiene datos");
            }
          });
      });

      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS servicio (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, idTipo INTEGER REFERENCES tipo_servicio (id) ON DELETE CASCADE, idTipoIntervalo INTEGER REFERENCES tipo_intervalo (id) ON DELETE CASCADE, idVehiculo INTEGER REFERENCES vehiculo (id) ON DELETE CASCADE, nombre VARCHAR (30), intervalo INTEGER (10), ultimoRealizado VARCHAR (15) );").then(
        function(result){
          console.log("TABLA SERVICIO CREADA")
        },function(error){
          console.log("ERROR AL CREAR TABLA SERVICIO")
          console.log(error);
      });

      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS mantenimiento (id_m INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,idServicio INTEGER REFERENCES servicio (id) ON DELETE CASCADE,detalle TEXT, precio DECIMAL (5, 2),fechaRealizado DATE);");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS notificacion (id INTEGER PRIMARY KEY AUTOINCREMENT,idServicio INTEGER REFERENCES servicio (id) ON DELETE CASCADE,cuandoRealizar INTEGER (10));");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS region (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR (20) UNIQUE);");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS publicidad (id INTEGER PRIMARY KEY AUTOINCREMENT, idRegion INTEGER REFERENCES region (id) ON DELETE CASCADE,nombre VARCHAR (30),url VARCHAR (50) );");


  });
})


/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
app.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
app.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});


app.controller("ExampleController", function($scope, $cordovaLocalNotification) {

    $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }

});
