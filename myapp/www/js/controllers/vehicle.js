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

  $scope.eliminarVehiculo = function(placa){
    var query = "DELETE FROM vehiculo WHERE placa = ?";
    $cordovaSQLite.execute(db, query, [placa]).then(function(result) {
      console.log("Vehiculo Eliminado");
    }, function(error){
      console.log(error);
    });
  }

  $scope.eliminarServicio = function(idServicio){
    var query = "DELETE FROM servicio WHERE id = ?";
    $cordovaSQLite.execute(db, query, [idServicio]).then(function(result) {
      for (var i = 0; i < $rootScope.selectedVehicleServices.length; i ++){
          var servicio = $rootScope.selectedVehicleServices[i];
          if (servicio.id == idServicio){
              $rootScope.selectedVehicleServices.splice(i, 1);
              break;
          }
      }
      console.log("Servicio Eliminado");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.chosenVehicle.id;
  }, function(){
    console.log("LOADING")
    $scope.selectedVehicle = [];
    $rootScope.selectedVehicleServices = [];
    $scope.actualid = $rootScope.chosenVehicle.id;
    var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'";
     $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({
            idVehiculo: res.rows.item(i).id,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            year: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });
          var servQuery = "SELECT * FROM servicio WHERE idVehiculo = ?"
          $cordovaSQLite.execute(db, servQuery, [res.rows.item(i).id]).then(function(res){
            if (res.rows.length > 0){
              for (var j=0; j<res.rows.length; j++){
                $rootScope.selectedVehicleServices.push({
                  id: res.rows.item(j).id,
                  idTipo: res.rows.item(j).idTipo,
                  idTipoIntervalo: res.rows.item(j).idTipoIntervalo,
                  idVehiculo: res.rows.item(j).idVehiculo,
                  nombre: res.rows.item(j).nombre,
                  intervalo: res.rows.item(j).intervalo,
                  ultimoRealizado: res.rows.item(j).ultimoRealizado
                });
              }
            }
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
