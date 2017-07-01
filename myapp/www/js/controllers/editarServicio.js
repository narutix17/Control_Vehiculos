angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("EditarServicio", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

    $scope.servicioEditado = {};

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.$watch(function(){
      return $rootScope.chosenService[0].ultimoRealizado;
    }, function(){
      $ionicLoading.hide();
    });

    $scope.editarServicio = function(){

      console.log("Editando servicio");
      var query = "UPDATE servicio SET idTipoIntervalo=?, intervalo=?, ultimoRealizado=? WHERE id=?"
      var idTipo = 2;
      $cordovaSQLite.execute(db, query, [idTipo, $scope.servicioEditado.intervalo, $scope.servicioEditado.ultimoRealizado, $rootScope.chosenService[0].id]).then(function(res){
        console.log("SERVICIO EDITADO");
      });

    }



}]);
