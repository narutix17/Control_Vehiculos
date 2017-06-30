angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerMantenimientos", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){


    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";
    //var query = "SELECT * FROM mantenimiento";
    console.log(query);
    $scope.selectedVehicleMantenimientos = [];
    console.log($rootScope.chosenVehicle.id);
    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
        if (res.rows.length > 0){
          for (var i=0; i<res.rows.length; i++) {
            $scope.selectedVehicleMantenimientos.push({
              nombre: res.rows.item(i).nombre,
              id: res.rows.item(i).id,
              idServicio: res.rows.item(i).idServicio,
              detalle: res.rows.item(i).detalle,
              precio: res.rows.item(i).precio,
              fechaRealizado: res.rows.item(i).fechaRealizado.substring(0, 15)
            });
          }
        }

        console.log(res.rows.length);
        console.log("Hola");
        $ionicLoading.hide();
    });
}]);
