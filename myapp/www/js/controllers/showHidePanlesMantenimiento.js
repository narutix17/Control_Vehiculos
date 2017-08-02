/**
 * Controlador utilizado para mostrar los proximos mantenimientos y realizar la busqueda.
 * Utilizado en:
 * Version: 1.0
 * Creador: Jose Cedeno
 * Editores:
 */

angular.module('app.controllers')


.controller('showHide', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {

	//funcion para ejecutar las funciones antes de entrar a la vista proximos Mantenimientos
	$scope.$on('$ionicView.beforeEnter', function () {
    	$scope.CurrentDate = new Date();
    	$scope.cargarvehiculos();
    	$scope.cargarServicios();
  	});

	//funcion para cargar los vehiculos 
	$scope.cargarvehiculos = function(){
		$scope.misvehiculos = [];
		var querys = "SELECT * FROM vehiculo";
		console.log("ingresaAaAaaaaaaaa");
  		$cordovaSQLite.execute(db, querys).then(function(resp){
    		console.log("si entra ps");
    		for (var f=0; f<resp.rows.length; f++) {
      			$scope.misvehiculos.push({ //arreglo con la informacion de mis vehiculos
      				id: resp.rows.item(f).id,
            		idMarca:resp.rows.item(f).idMarca,
            		idTipo: resp.rows.item(f).idTipo,
            		placa: resp.rows.item(f).placa,
            		alias: resp.rows.item(f).alias
      			});
    		}
  		});
  		console.log("tamaño: "+$scope.misvehiculos.length);
  	}
  	//funcion para sumar los dias y determinar cuando toca un mantenimiento
  	function sumarDias(fecha, dias){
  		fecha.setDate(fecha.getDate() + dias);
  		return fecha;
	}
	//funcion para cargar los servicios ue se mostraran en la vista Proximos Mantenimientos
	$scope.cargarServicios = function(){
		var query = "SELECT * FROM servicio";
	    $scope.selectedVehicleAlias = [];
	    $scope.nom = [];
	    $scope.temporalSave = [];
	    $scope.vehicleInfoMantenimientos = [];
	    $scope.selectedVehicleMantenimientos = [];

	    $cordovaSQLite.execute(db, query).then(function(res){ //se ejecuta el query
	        if (res.rows.length > 0){
	    		for(var i=0; i<res.rows.length; i++){

	    			if (res.rows.item(i).idTipoIntervalo == "Fecha"){ //condicion para verificar ue el tipo de intervalo sea por fecha

	    				$scope.fecha = new Date(res.rows.item(i).ultimoRealizado);
	    				console.log("fechaa1: "+$scope.CurrentDate.toString().substring(0, 15));
	    				console.log("fechaa2: "+$scope.fecha.toString().substring(0, 15));
	    				console.log("fecha3: "+sumarDias($scope.fecha, res.rows.item(i).intervalo)); //se suma los dias
	    				if ($scope.CurrentDate < $scope.fecha){ //condicion para solo obtener los servicios de fechas proximas

	    					for(var j=0; j<$scope.misvehiculos.length; j++){ //se recorre el arreglo de vehiculos para obtener sus datos 
	    						if ($scope.misvehiculos[j].id == res.rows.item(i).idVehiculo){
	    							console.log("entraaaaaaaa");
	    							$scope.selectedVehicleMantenimientos.push({ //se coloca en el arreglo los datos a presentar en la vista(html)
	    								fecha: $scope.fecha,
	    								alias: $scope.misvehiculos[j].alias,
	    								placa: $scope.misvehiculos[j].placa,
	    								fechaRealizado: $scope.fecha.toString().substring(0, 15),
	    								nombre: res.rows.item(i).nombre
	    							});
	    						}
	    					}

	    				}
	    			}
	    		}    	
	          
	        
	        }
	       	$scope.temporalSave = $scope.selectedVehicleMantenimientos;
	        $ionicLoading.hide();
	    });

	}

	// funcion para obtener la informacion de fecha precio y detalle
    $scope.setInfo = function(fecha, precio, detalle){
    	$rootScope.setInfoMant = {}
    	$rootScope.setInfoMant.fecha = fecha;
    	$rootScope.setInfoMant.precio = precio;
    	$rootScope.setInfoMant.detalle = detalle;
    }

  	//funcion para desplegar los servicios 
	$scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
	      $scope.shownGroup = group;
	    }
	};
	$scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	};

	//funcion para buscar los proximos mantenimientos
	$scope.buscar = function(){
      $scope.selectedVehicleMantenimientos = $scope.temporalSave;
      fecha = document.getElementById("fecha").value;
      //console.log(fecha);
      $scope.fecha = new Date(fecha.replace(/-/g, '\/'));
      $scope.arrayTemporal = [];
      //$scope.arrayTemporal = $scope.vehicleMantenimientos;

      for(var i=0; i<$scope.selectedVehicleMantenimientos.length; i++){
      	//console.log("fecha1: "+$scope.fecha.toString().substring(0, 15));
      	//console.log("fecha2: "+$scope.selectedVehicleMantenimientos[i].fechaRealizado);
        if($scope.fecha.toString().substring(0, 15) == $scope.selectedVehicleMantenimientos[i].fechaRealizado){
          var existe = true;
          $scope.arrayTemporal.push({
            nombre: $scope.selectedVehicleMantenimientos[i].nombre,
            placa: $scope.selectedVehicleMantenimientos[i].placa,
            fecha: $scope.fecha,
            alias: $scope.selectedVehicleMantenimientos[i].alias,
            fechaRealizado: $scope.selectedVehicleMantenimientos[i].fechaRealizado
          });
        }
      }
      if(!existe){
      	alert("No hay servicio para esta fecha");
      }
      $scope.selectedVehicleMantenimientos = "";
      $scope.selectedVehicleMantenimientos = $scope.arrayTemporal;



    }


});
