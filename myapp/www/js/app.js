// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;


var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngCordova'])

app.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

/**
 * This method is excecuted when app starts running. Inside this function we create the Database. Every SQL execute command
 * is validated everytime the app opens, to avoid redundancy problems.
 */
app.run(function($ionicPlatform, $cordovaSQLite) {
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

    // Open DB
    db = $cordovaSQLite.openDB({ name: "controlvehiculos.db", iosDatabaseLocation:'default'});

  /**
   * Creating tables and default registries
   */
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

      $cordovaSQLite.execute(db,"CREATE TABLE if NOT EXISTS vehiculo ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, idTipo INTEGER NOT NULL REFERENCES tipo_vehiculo (id), color VARCHAR(10), placa VARCHAR (10) UNIQUE, marca VARCHAR (20), alias VARCHAR (20), año INTEGER (4), kilometraje INTEGER (7) NOT NULL, imagen TEXT);")


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

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS servicios_predeterminados (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR(40), tipo_intervalo INTEGER NOT NULL REFERENCES tipo_vehiculo (id), intervalo INTEGER)").then(function(result){
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


      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS servicio (id INTEGER NOT NULL PRIMARY KEY, idTipo INTEGER REFERENCES tipo_servicio (id), idTipoIntervalo INTEGER REFERENCES tipo_intervalo (id), idVehiculo INTEGER REFERENCES vehiculo (id), nombre VARCHAR (30), intervalo INTEGER (10), ultimoRealizado INTEGER (10) );").then(function(result){
        $cordovaSQLite.execute(db,"select * from servicio").then(function(result){
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
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS mantenimiento (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,idServicio INTEGER REFERENCES servicio (id),detalle TEXT, precio DECIMAL (5, 2),fechaRealizado DATE);");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS notificacion (id INTEGER PRIMARY KEY AUTOINCREMENT,idServicio INTEGER REFERENCES servicio (id),cuandoRealizar INTEGER (10));");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS region (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR (20) UNIQUE);");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS publicidad (id INTEGER PRIMARY KEY AUTOINCREMENT, idRegion INTEGER REFERENCES region (id),nombre VARCHAR (30),url VARCHAR (50) );");


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
