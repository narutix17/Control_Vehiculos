/**
 * Controlador para
 * Utilizado en:
 * Version: 1.0
 * Creador: Jose Cedeno
 */
angular.module('app.controllers')

app.controller("infoMantenimiento", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

	$scope.fechaMant = $rootScope.setInfoMant.fecha;
  	$scope.precioMant = $rootScope.setInfoMant.precio;
  	$scope.detalleMant = $rootScope.setInfoMant.detalle;

  	console.log("fecha: "+$scope.fechaMant);
    console.log("precio: "+$scope.precioMant);
    console.log("detalle: "+$scope.detalleMant);

  	$ionicLoading.show({
    	content: 'Loading',
    	animation: 'fade-in',
    	showBackdrop: false,
    	maxWidth: 200,
    	showDelay: 0
  	});


  	$scope.$watch(function(){
      return $rootScope.setInfoMant;
    }, function(){
      $ionicLoading.hide();
    });

}]);
