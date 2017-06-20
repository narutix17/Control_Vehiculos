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
    db = $cordovaSQLite.openDB({ name: "controlvehiculos.db", iosDatabaseLocation:'default'});
    
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS vehiculo (placa text primary key, color text, marca text, alias text, modelo text, tipo text, imagen text, kilometraje integer, year integer)");
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS tipo_vehiculo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR (20) UNIQUE);").then(function(result){
        $cordovaSQLite.execute(db,"select * from tipo_vehiculo").then(function(result){
          if (result.rows.length==0) {
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["automovil"]);
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["camion"]);
            $cordovaSQLite.execute(db,"insert into tipo_vehiculo (nombre) VALUES (?)",["taxi"]);
            console.log("seeee insertaron 3 tipos de vehiculoossssssssssssssssssssssss");
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

      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS color (id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,nombre VARCHAR (15) UNIQUE);").then(function(result){
        $cordovaSQLite.execute(db,"select * from color").then(function(result){
          if (result.rows.length==0) {
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["rojo"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["azul"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["amarillo"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["blanco"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["negro"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["cafe"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["anaranjado"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["violeta"]);
            $cordovaSQLite.execute(db,"insert into color (nombre) VALUES (?)",["morado"]);
            console.log("seeee insertaron colores");
          }
          else{
            console.log("tabla color ya tiene datos");

          }
        },function(error){

          console.log(error);

        });

      },function(error){
        console.log(error);

      });

      $cordovaSQLite.execute(db,"CREATE TABLE if NOT EXISTS vehiculo ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, idTipo INTEGER NOT NULL REFERENCES tipo_vehiculo (id), idColor INTEGER REFERENCES color (id), placa VARCHAR (10) UNIQUE, modelo VARCHAR (30), marca VARCHAR (20), alias VARCHAR (15), año INTEGER (4), kilometraje INTEGER (10) NOT NULL, imagen TEXT, vista INTEGER (1));")


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
      $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS servicio (id INTEGER NOT NULL PRIMARY KEY, idTipo INTEGER REFERENCES tipo_servicio (id), idTipoIntervalo INTEGER REFERENCES tipo_intervalo (id), idVehiculo INTEGER REFERENCES vehiculo (id), nombre VARCHAR (30), intervalo INTEGER (10), ultimoRealizado INTEGER (10) );");
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

app.controller("DBController", function($scope, $cordovaSQLite){

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.select();
  });

  $scope.insert = function(){
    var query = "INSERT INTO vehiculo (placa, color, marca, alias, modelo, tipo, imagen, kilometraje, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.placa, $scope.color, $scope.marca, $scope.alias, "", $scope.tipo, "", 5000, $scope.year]).then(function(result) {
      console.log("Vehiculo Agregado");
    }, function(error){
      console.log(error);
    });
  }

  $scope.select = function(){
    $scope.allSessions=[];
    var query = "SELECT alias, placa, marca, kilometraje FROM vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.allSessions.push({
            alias: res.rows.item(i).alias,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca
          });
        }
        console.log($scope.allSessions[0].alias);
      }else{
        console.log("No hay Registros");
      }
      console.log("ESTAS LLAMANDO A SELECT");
    }, function(error){
      console.log(error);
    });
  }

  $scope.cargarVehiculos = function(){
    $scope.registrosVehiculos=[];
    var query = "SELECT * FROM vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosVehiculos.push({
            idVehiculo: res.rows.item(i).idVehiculo,
            idTipo: res.rows.item(i).idTipo,
            idColor: res.rows.item(i).idColor,
            placa: res.rows.item(i).placa,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            año: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });
        }
        console.log($scope.registrosVehiculos[0].nombre);
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
    }, function(error){
      console.log(error);
    });
  }

  $scope.selectTipoVehiculos = function(){
    $scope.registrosTipoDeVehiculos=[];
    var query = "SELECT * FROM tipo_vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosTipoDeVehiculos.push({
            idTipoVehiculo: res.rows.item(i).idTipoVehiculo,
            nombre: res.rows.item(i).nombre,
            
          });
        }
        console.log($scope.registrosTipoDeVehiculos[0].nombre);
      }else{
        console.log("No hay Registros");
      }
      console.log("ESTAS LLAMANDO A SELECT");
    }, function(error){
      console.log(error);
    });
  }


  $scope.crearVehiculo = function(){
    var query = "insert into vehiculo (idTipo, idColor, placa, modelo, marca, alias, año, kilometraje, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.idTipo, $scope.idColor, $scope.placa, $scope.modelo,$scope.marca, $scope.alias, $scope.año,$scope.kilometraje, $scope.imagen]).then(function(result) {
      console.log("Vehiculo Agregado");
    }, function(error){
      console.log(error);
    });
  }

  $scope.agregarServicioPredeterminado=function(){
    var query="insert into servicio (idTipo,idTipoIntervalo,idVehiculo,nombre,intervalo,ultimoRealizado) values (?,?,?,?,?,?)";
    $cordovaSQLite.execute(db,query,[$scope.idTipoServicio,$scope.idTipoIntervalo,$scope.idVehiculo,$scope.nombre,$scope.intervalo,$scope.ultimoRealizado]).then(
    function(result){
      console.log("servicio agregado");
    },function(error){
      console.log(error);
    });
  }

    $scope.modificarVehiculo = function(){
    var query = "update vehiculo set idTipo=?, idColor=?, placa=?, modelo=?, marca=?, alias=?, año=?, kilometraje=?, imagen=?";
    $cordovaSQLite.execute(db, query, [$scope.idTipo, $scope.idColor, $scope.placa, $scope.modelo,$scope.marca, $scope.alias, $scope.año,$scope.kilometraje, $scope.imagen]).then(function(result) {
      console.log("Vehiculo Actualizado");
    }, function(error){
      console.log(error);
    });
  }

  $scope.agregarServicioRealizdo=function(){
    var query="insert into mantenimiento (idServicio,detalle,precio,fechaRealizado) values (?,?,?,?)";
    $cordovaSQLite.execute(db,query,[$scope.idServicio,$scope.detalleServicio,$scope.precioServicio,$scope.fechaRealizadoServicio]).then(
    function(result){
      console.log("SERVICIO REALIZADO AGREGADO CON EXITO");
    },function(error){
      console.log(error);
    });
  }



});
