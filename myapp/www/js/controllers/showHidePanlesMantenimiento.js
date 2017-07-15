
angular.module('app.controllers')

.controller('showHide', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {
	

	$scope.$on('$ionicView.beforeEnter', function () {
    	$scope.CurrentDate = new Date();
    	
    	$scope.cargarMantenimientos();
  	});
	
	

	$scope.cargarMantenimientos = function(){
		var query = "SELECT * FROM mantenimiento";
	    $scope.selectedVehicleAlias = [];
	    $scope.nom = [];
	    $scope.selectedVehicleMantenimientos = [];
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
						console.log("query2: " + res2);
					    console.log("res: " + res);
					    console.log("i: " + i);
					    console.log("h: " + h);
					    console.log("scopeNOMBRE; " + res2.rows.item(0).nombre);
					    
					    if ($scope.fecha >= $scope.CurrentDate){
						    $scope.selectedVehicleMantenimientos.push({
				              nombre: res2.rows.item(0).nombre,
				              id: res.rows.item(h).id,
				              idServicio: res.rows.item(h).idServicio,
				              detalle: res.rows.item(h).detalle,
				              precio: res.rows.item(h).precio,
				              fecha: $scope.fecha,
				              fechaRealizado: res.rows.item(h).fechaRealizado.substring(0, 15),
				              aliass: res2.rows.item(0).alias
				            });
				            console.log("selectedVehicleMantenimientos:");
				            console.log($scope.selectedVehicleMantenimientos);
				            h = h + 1;
			            }else{
				        	var n = h+1;
				        	h = h + 1;
				        	console.log("entra aca y h: " + h);
				        	//$scope.idS = res.rows.item(n).idServicio;
				        	//console.log($scope.idS);
				        	//$scope.fehcaRealiz = res.rows.item(n).fechaRealizado;
			          		//$scope.fecha = new Date($scope.fehcaRealiz);
			        }
			        
					});

		        	//var s = $scope.nom;
		        	//var o = JSON.parse(s);
		        	//$scope.nombr = o[0].alias;
		        	
		        	
		        } 
	          
	          
	        }
	        
	        $ionicLoading.hide();
	    });
	    
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
  
});