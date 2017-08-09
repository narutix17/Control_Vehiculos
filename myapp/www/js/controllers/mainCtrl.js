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



	var procesoDePublicidades = setInterval(mostrarPublicidad, 1 * 1000);

	function mostrarPublicidad(){

		$http.get("http://192.168.0.100:3000/api/publicidad").success(function(res){

			var publicidades = res;
			var totPublicidades = publicidades.length;
			var publicidadAMostrar = Math.floor((Math.random() * totPublicidades-1) + 1);
			var publicidad = publicidades[publicidadAMostrar];

			var imgPublicidad = document.getElementsByClassName("imgpublicidad")[0];
			var linkPublicidad = document.getElementsByClassName("linkpublicidad")[0];
			imgPublicidad.src = publicidad.url_imagen;
			linkPublicidad.href = publicidad.url_publicidad;
			var pContainer = document.getElementsByClassName("publicidad")[0];

			if (typeof pContainer !== "undefined"){
				if (pContainer.style.display == "none"){

					pContainer.style.display = "inline";

				} else {
					pContainer.style.display = "none";
				}
			}
			console.log(publicidades);
		}).error(function(err){
			console.log("error al traer");
			return;
		})
	}
}]);
