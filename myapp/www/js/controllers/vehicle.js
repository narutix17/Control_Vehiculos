angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerOneVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicPopup, $state){



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

  $scope.editarServicio = function(id, nombre, servTipo, intervalo, ultimoRealizado){
      $rootScope.chosenService = [];
      $rootScope.chosenService.push({
        id: id,
        nombre: nombre,
        servTipo: servTipo,
        intervalo: intervalo,
        ultimoRealizado: ultimoRealizado
      });
  }



  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.chosenVehicle.id;
  }, function(){
    if ($scope.called == true){
      return;
    }
    $scope.called = true;
    console.log("LOADING")
    $scope.selectedVehicle = [];
    $rootScope.selectedVehicleServices = [];
    $scope.actualid = $rootScope.chosenVehicle.id;
    //var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'";
    var query = "SELECT vehiculo.id,vehiculo.idTipo,vehiculo.color,vehiculo.placa,vehiculo.idMarca,vehiculo.alias,vehiculo.año,vehiculo.kilometraje,vehiculo.imagen,marca.nombre as marca FROM vehiculo JOIN marca ON vehiculo.idMarca=marca.id WHERE vehiculo.id=? LIMIT 1";

     console.log("idVehiculo: "+$scope.actualid);
     $cordovaSQLite.execute(db, query,[$scope.actualid]).then(function(res){
      console.log("res.length: "+res.rows.length);
      console.log("res.rows.item(0): "+res.rows.item(0));
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({
            id: res.rows.item(i).id,
            idMarca:res.rows.item(i).idMarca,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            year: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });
          $rootScope.selectedVehicleServices = [];
          var servQuery = "SELECT * FROM servicio WHERE idVehiculo = ?"
          $cordovaSQLite.execute(db, servQuery, [res.rows.item(i).id]).then(function(res){
            console.log(res.rows.length);
            if (res.rows.length > 0){
              for (var j=0; j<res.rows.length; j++){
                if (res.rows.length != $rootScope.selectedVehicleServices.length){
                  console.log($rootScope.selectedVehicleServices.length);
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
            }
            console.log($rootScope.selectedVehicleServices.length);
            $scope.called = false;
            $ionicLoading.hide();
          });

        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
      // When the vehicle is loaded we hide the Loading screen.

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
