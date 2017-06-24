angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerOneVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){


  $scope.updatedKm = {};

  // We use a loading screen to wait the selected vehicle to be loaded from the database
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.alias;
  }, function(){
    console.log("LOADING")
    $scope.selectedVehicle = [];
    $scope.actualAlias = $rootScope.alias;
    var query = "SELECT * FROM vehiculo WHERE alias = '"+ $scope.actualAlias +"'";
     $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({
            idVehiculo: res.rows.item(i).idVehiculo,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            year: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });
        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
      // When the vehicle is loaded we hide the Loading screen.
      $ionicLoading.hide();
      }, function(error){
        console.log(error);
      });
  });


  /**
   * Update a vehicle Km
   */
  $scope.actualizarKilometraje = function(alias){
    console.log($scope);
    console.log($scope.updatedKm.km);
    console.log(alias);
    var query = "UPDATE vehiculo SET kilometraje=? WHERE alias=?";
    console.log(query);
    $cordovaSQLite.execute(db, query, [$scope.updatedKm.km, alias]).then(function(result) {
      console.log("Km Actualizado");
    }, function(error){
      console.log(error);
    });

  }

}]);
