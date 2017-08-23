/**
 * Controlador global utilizado para mostrar las publicidades
 * Utilizado en: Todas las vistas
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')

app.controller("MainCtrl", ['$scope', '$http', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $http ,$cordovaSQLite, $rootScope, $ionicLoading){

	$scope.$on('$ionicView.loaded', function () {

  });



	var procesoDePublicidades = setInterval(mostrarPublicidad, 10 * 1000);

	function mostrarPublicidad(){

		$http.get("http://www.vcontrol-publicidades.com/api/publicidad").success(function(res){

			var publicidades = res;
			var totPublicidades = publicidades.length;
			var publicidadAMostrar = Math.floor((Math.random() * totPublicidades-1) + 1);
			console.log(publicidades);
			var publicidad = publicidades[publicidadAMostrar];
			console.log(publicidad);
			console.log(publicidad.file_name);
			var imgPublicidad = document.getElementsByClassName("imgpublicidad")[0];
			var linkPublicidad = document.getElementsByClassName("linkpublicidad")[0];
			imgPublicidad.src = "http://www.vcontrol-publicidades.com/uploads/" + publicidad.file_name;
			console.log(imgPublicidad.src);
			linkPublicidad.href = publicidad.url_publicidad;

		}).error(function(err){
			console.log("error al traer");
			return;
		})
	}
}]);
