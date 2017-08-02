/**
 * Controlador utilizado para 
 * Utilizado en:
 * Version: 1.0
 * Creador: Jose Cedeno
 * Editores:
 */
angular.module('app.controllers')

.controller('showHide', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {


	$scope.$on('$ionicView.beforeEnter', function () {
    	$scope.CurrentDate = new Date();
    	$scope.cargarvehiculos();
    	$scope.cargarMantenimientos();
  	});


	$scope.cargarvehiculos = function(){
		$scope.misvehiculos = [];
		var querys = "SELECT * FROM vehiculo";
		console.log("ingresaAaAaaaaaaaa");
  		$cordovaSQLite.execute(db, querys).then(function(resp){
    		console.log("si entra ps");
    		for (var f=0; f<resp.rows.length; f++) {
      			$scope.misvehiculos.push({
      				id: resp.rows.item(f).id,
            		idMarca:resp.rows.item(f).idMarca,
            		idTipo: resp.rows.item(f).idTipo,
            		alias: resp.rows.item(f).alias
      			});
    		}
  		});
  		console.log("tamaño: "+$scope.misvehiculos.length);
  	}

	$scope.cargarMantenimientos = function(){
		var query = "SELECT * FROM mantenimiento";
	    $scope.selectedVehicleAlias = [];
	    $scope.nom = [];
	    $scope.temporalSave = [];
	    $scope.vehicleInfoMantenimientos = [];
	    $scope.selectedVehicleMantenimientos = [];
	    var cont = 0;
		var n = 0;
		console.log("holaaa??");
	    $cordovaSQLite.execute(db, query).then(function(res){
	        if (res.rows.length > 0){
	        	var h = 0;
	        	console.log(res.rows.length);
	        	$scope.idS = res.rows.item(0).idServicio;
	        	$scope.fehcaRealiz = res.rows.item(0).fechaRealizado;
	          	$scope.fecha = new Date($scope.fehcaRealiz);
	          	console.log("primer fecha" + $scope.fecha);
	          	for (var i=0; i<res.rows.length; i++) {


	          	//$scope.fehcaRealiz = res.rows.item(i).fechaRealizado;
	          	//$scope.fecha = new Date($scope.fehcaRealiz);
	          		$scope.idS = res.rows.item(i).idServicio;
	          		//console.log("entro al if de fechas");
	          		//console.log("idServicio: " + res.rows.item(i).idServicio);
	          		//console.log("fecha: " + $scope.fecha);



		          	console.log("i: " + i);
		          	var query2 = "SELECT * FROM vehiculo JOIN servicio ON vehiculo.id = servicio.idVehiculo AND servicio.id = ?";
		          	//var query3 = "SELECT * FROM vehiculo JOIN servicio ON vehiculo.id = servicio.idVehiculo AND servicio.id = ?";
					$cordovaSQLite.execute(db, query2, [$scope.idS]).then(function(res2){
						//$cordovaSQLite.execute(db, query3, [$scope.idS]).then(function(res3){
						//$scope.idS = res.rows.item(h).idServicio;
						$scope.fehcaRealiz = res.rows.item(h).fechaRealizado;
	          			$scope.fecha = new Date($scope.fehcaRealiz);
						console.log("entraaaaa");
						console.log("fecha: " + $scope.fecha);
						console.log("query2: " + JSON.stringify(res2.rows));
					    console.log("res: " + JSON.stringify(res.rows));
					    console.log("i: " + i);
					    console.log("h: " + h);
					    console.log("scopeNOMBRE; " + res2.rows.item(0).nombre);

					    if ($scope.fecha >= $scope.CurrentDate){

				            	var num = 0;
				            	console.log("ht: "+h);
				            	if (res.rows.length > h){
					              	for(var k=0; k<h; k++){
					                	console.log("k: "+k);
					                	console.log("fehcaRea1: "+res.rows.item(h).fechaRealizado.substring(0, 15));
					                	console.log("fechaRea2: "+res.rows.item(k).fechaRealizado.substring(0, 15));
					                	if((res.rows.item(h).fechaRealizado.substring(0, 15)) == (res.rows.item(k).fechaRealizado.substring(0, 15))){
					                  		console.log("ENTRA IF VERDADERO");
					                  		console.log("h de verdad"+h);
					                  		console.log("ID: "+res.rows.item(k).idServicio);
					                  		//$scope.ident = n;

					                  		for (c=0; c<$scope.misvehiculos.length; c++){
					                  			console.log("ingresa1");
					                  			console.log(res2.rows.item(0).idVehiculo);
					                  			console.log($scope.misvehiculos[c].id);
					                  			if (res2.rows.item(0).idVehiculo == $scope.misvehiculos[c].id){
					                  				console.log("ingresa2");
					                  				console.log("nombre: "+res.rows.item(h).nombre);
					                  				console.log("nombre: "+res.rows.item(k).nombre);
					                  				$scope.vehicleInfoMantenimientos.push({
					                    				nombre: res2.rows.item(0).nombre,
					                    				id: res.rows.item(k).id_m,
					                    				idServicio: res.rows.item(h).idServicio,
					                    				detalle: res.rows.item(h).detalle,
					                    				precio: res.rows.item(h).precio,
					                    				//identif: $scope.ident,
					                    				//fecha: $scope.fecha,
					                    				aliass: $scope.misvehiculos[c].alias,
					                    				fechaRealizado: res.rows.item(0).fechaRealizado.substring(0, 15)
					                  				});
					                  			}
					                  		}

					                	}else{
					                  		console.log("ENTRA IF FALSO");
					                  		num = num + 1;
					                	}
					              	}
					              	console.log("despues");
				            	}
				            	if(num == h){
				              		console.log("ENTRA NUM: "+num);
				              		console.log("ENTRA CONTh: "+h);
				              		$scope.fehcaRealiz = res.rows.item(h).fechaRealizado;
				              		$scope.fecha = new Date($scope.fehcaRealiz);
				              		$scope.selectedVehicleMantenimientos.push({
				                		nombre: res2.rows.item(0).nombre,
				                		id: res.rows.item(h).id_m,
				                		idServicio: res.rows.item(h).idServicio,
				                		detalle: res.rows.item(h).detalle,
				                		precio: res.rows.item(h).precio,
				                		fecha: $scope.fecha,
				                		aliass: res2.rows.item(0).alias,
				                		fechaRealizado: res.rows.item(h).fechaRealizado.substring(0, 15)
				              		});
				              		console.log("ID: "+res.rows.item(h).id);
				              		$scope.vehicleInfoMantenimientos.push({
				               			nombre: res2.rows.item(0).nombre,
				                		id: res.rows.item(h).id_m,
				                		idServicio: res.rows.item(h).idServicio,
				                		detalle: res.rows.item(h).detalle,
				                		precio: res.rows.item(h).precio,
				                		fecha: $scope.fecha,
				                		aliass: res2.rows.item(0).alias,
				                		fechaRealizado: res.rows.item(h).fechaRealizado.substring(0, 15)
				              		});
				              		console.log("selected: "+$scope.selectedVehicleMantenimientos);
	        						console.log("vehicle: "+$scope.vehicleInfoMantenimientos);
				            	}

				          	h = h + 1;
				        }else{
				        	var n = h+1;
				        	h = h + 1;
				        	console.log("entra aca y h: " + h);

			        	}


					});

		        }


	        }
	        $scope.temporalSave = $scope.selectedVehicleMantenimientos;
	        console.log("fin");
	        $ionicLoading.hide();
	    });

	}


    $scope.setInfo = function(fecha, precio, detalle){
    	console.log("fecha: "+fecha);
    	console.log("precio: "+precio);
    	console.log("detalle: "+detalle);
    	$rootScope.setInfoMant = {}
    	$rootScope.setInfoMant.fecha = fecha;
    	$rootScope.setInfoMant.precio = precio;
    	$rootScope.setInfoMant.detalle = detalle;
    }


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


	$scope.buscar = function(){
      $scope.selectedVehicleMantenimientos = $scope.temporalSave;
      fecha = document.getElementById("fecha").value;
      console.log(fecha);
      $scope.fecha = new Date(fecha.replace(/-/g, '\/'));
      $scope.arrayTemporal = [];
      //$scope.arrayTemporal = $scope.vehicleMantenimientos;

      for(var i=0; i<$scope.selectedVehicleMantenimientos.length; i++){
      	console.log("fecha1: "+$scope.fecha.toString().substring(0, 15));
      	console.log("fecha2: "+$scope.selectedVehicleMantenimientos[i].fechaRealizado);
        if($scope.fecha.toString().substring(0, 15) == $scope.selectedVehicleMantenimientos[i].fechaRealizado){
          $scope.arrayTemporal.push({
            nombre: $scope.selectedVehicleMantenimientos[i].nombre,
            id: $scope.selectedVehicleMantenimientos[i].id,
            idServicio: $scope.selectedVehicleMantenimientos[i].idServicio,
            detalle: $scope.selectedVehicleMantenimientos[i].detalle,
            precio: $scope.selectedVehicleMantenimientos[i].precio,
            //fecha: $scope.fecha,
            aliass: $scope.selectedVehicleMantenimientos[i].aliass,
            fechaRealizado: $scope.selectedVehicleMantenimientos[i].fechaRealizado
          });
        }
      }
      $scope.selectedVehicleMantenimientos = "";
      $scope.selectedVehicleMantenimientos = $scope.arrayTemporal;



    }


});
