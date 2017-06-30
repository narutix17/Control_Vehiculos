angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBEditarServicioNuevo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

    $scope.servicioEditado = {};

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.$watch(function(){
      return $rootScope.chosenService[0].nombre;
    }, function(){
      $ionicLoading.hide();
    });

    $scope.editarServicioParaAgregar = function(){
      for (var i = 0; i < $rootScope.serviciosParaAgregar.length ; i++){
        if ($rootScope.serviciosParaAgregar[i].nombre == $rootScope.chosenService[0].nombre){
            $rootScope.serviciosParaAgregar[i].tipo_intervalo = $scope.servicioEditado[0].tipo_intervalo;
            $rootScope.serviciosParaAgregar[i].intervalo = $scope.servicioEditado[0].intervalo;
            $rootScope.serviciosParaAgregar[i].ultimoRealizado = $scope.servicioEditado[0].ultimoRealizado;
            break;
        }
      }
    }



}]);
