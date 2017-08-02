/**
 * Controlador utilizado para editar servicios de un vehiculo nuevo.
 * Utilizado en: editarServicioNuevo.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')

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

    // Funcion para editar los servicios de un nuevo vehiculo aun no agregado a la base
    $scope.editarServicioParaAgregar = function(){
      console.log("Editando servicio");
      for (var i = 0; i < $rootScope.serviciosParaAgregar.length ; i++){
        console.log($rootScope.serviciosParaAgregar[i].nombre);
        console.log($rootScope.chosenService[0].nombre);
        if ($rootScope.serviciosParaAgregar[i].nombre == $rootScope.chosenService[0].nombre){
            console.log("EDITANDOOOOOOOOOOOOO");
            $rootScope.serviciosParaAgregar[i].tipo_intervalo = $scope.servicioEditado.tipo_intervalo;
            $rootScope.serviciosParaAgregar[i].intervalo = $scope.servicioEditado.intervalo;
            $rootScope.serviciosParaAgregar[i].ultimoRealizado = $scope.servicioEditado.ultimoRealizado;
            console.log($scope.servicioEditado.ultimoRealizado);
            console.log($rootScope.serviciosParaAgregar[i].ultimoRealizado);
            break;
        }
      }
    }



}]);
