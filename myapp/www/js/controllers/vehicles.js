angular.module('app.controllers')
/**
 * Controller for Vehicle operations
 */
.controller("DBControllerVehiculo", ['$scope', '$cordovaSQLite', '$rootScope',  '$ionicLoading',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

  $rootScope.serviciosParaAgregar = [];
  /**
   * Scope methods excecuted before entering the view that implements the controller
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.cargarVehiculos();
    $scope.cargarPredeterminados();
  });

  /**
   * Create Vehicle method. Recieve the form model located in "agregarVehiculo.html"
   */
  $scope.crearVehiculo = function(){
    var query = "INSERT INTO vehiculo (idTipo, color, placa, marca, alias, año, kilometraje, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [1, $scope.newColor, $scope.newPlaca, $scope.newMarca, $scope.newAlias, $scope.newYear, $scope.newKilometraje, ""]).then(function(result) {
      console.log("Vehiculo Agregado");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Set onto a $scope variable the selected vehicle identifier.
   */
  $scope.setVehicle = function(alias, id, placa){
    $rootScope.chosenVehicle = {}
    $rootScope.chosenVehicle.alias = alias;
    $rootScope.chosenVehicle.id = id;
    $rootScope.chosenVehicle.placa = placa;
  }


  /**
   * Load all the vehicles into $scope variable.
   */
  $scope.cargarVehiculos = function(){
    $rootScope.serviciosParaAgregar = [];
    // Hardcoded vehicle for web testing
    $scope.registrosVehiculos=[];
    var query = "SELECT * FROM vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosVehiculos.push({
            idVehiculo: res.rows.item(i).id,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            año: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });

        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Load all the default_services.
   */
  $scope.cargarPredeterminados = function(){
    console.log("NO ESTA DEFINIDO. LO VOY A DEFINIR");
    $rootScope.serviciosPredeterminados = [];
    var query = "SELECT * FROM servicios_predeterminados";
    console.log(query);
    $cordovaSQLite.execute(db, query).then(function(res){
      console.log(res);
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $rootScope.serviciosPredeterminados.push({
            nombre: res.rows.item(i).nombre,
            tipo_intervalo: res.rows.item(i).tipo_intervalo,
            intervalo: res.rows.item(i).intervalo
          });
        }
      $rootScope.predeterminadosAgregados = true;
      console.log("Se agregaron los servicios predeterminados.")
      }else{
        console.log("No hay servicios predeterminados");
      }
      console.log("SE CARGARON : "+ res.rows.length + " SERVICIOS");
    }, function(error){
      console.log(error);
    });
  }
}]);
