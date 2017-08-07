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


   
    //$(document).ready(function(){
        //$("#boton").click(function(){
            //var serv = $('#servRealizado option:selected').text();
            //$("#nomb").append('<div class="row"><div class="col col-80"><h5>'+serv+'</h5></div><div class="col col-10"><button class="icon ion-android-remove-circle" style="font-size: 30px; background-color: #FFFFFF; border:none; vertical-align: middle; color:#A51D1D"></button></div></div>');
        //});
    //});

}]);
