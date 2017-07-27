angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
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
    	showBackdrop: true,
    	maxWidth: 200,
    	showDelay: 0
  	});


  	$scope.$watch(function(){
      return $rootScope.setInfoMant;
    }, function(){
      $ionicLoading.hide();
    });

}]);
