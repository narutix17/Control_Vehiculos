angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerAgregarMantenimiento", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

    $scope.newMantenimiento = {};

    $scope.agregarMantenimiento = function(){
        console.log($scope.newMantenimiento.nombreServ);
        var nombreServicio = $scope.newMantenimiento.nombreServ;

        var servId = "";
        for (var i = 0; i< $rootScope.selectedVehicleServices.length; i++){
            console.log($rootScope.selectedVehicleServices[i].nombre);
            console.log(nombreServicio);
            if ($rootScope.selectedVehicleServices[i].nombre === nombreServicio){
                servId = $rootScope.selectedVehicleServices[i].id;
                break;
            }
        }
        console.log(servId);
        var query = "INSERT INTO mantenimiento  (idServicio, detalle, precio, fechaRealizado) VALUES (?, ?, ?, ?)";
        $cordovaSQLite.execute(db, query, [servId, $scope.newMantenimiento.obs, $scope.newMantenimiento.valor ,$scope.newMantenimiento.fecha]).then(function(res){
            console.log("Mantenimiento Agregado");
        });

    }


}]);
