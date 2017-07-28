angular.module('app.controllers')

.controller('gastosController', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {

  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
  });


  var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";



    console.log(query);
    $scope.selectedVehicleMantenimientos = [];
    $scope.vehicleMantenimientos = [];
    $scope.vehicleInfoMantenimientos = [];
    console.log($rootScope.chosenVehicle.id);

    $scope.graph = {};
    $scope.graph.data = [
      []
    ];

    $scope.graph.labels = [];

    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.fehcaRealiz = res.rows.item(i).fechaRealizado;
          $scope.fecha = new Date($scope.fehcaRealiz);

          $scope.selectedVehicleMantenimientos.push({
            nombre: res.rows.item(i).nombre,
            id: res.rows.item(i).id_m,
            idServicio: res.rows.item(i).idServicio,
            detalle: res.rows.item(i).detalle,
            precio: res.rows.item(i).precio,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(i).fechaRealizado.substring(0, 15),
            fechaEntera: res.rows.item(i).fechaRealizado
          });
        }
      }

      $scope.selectedVehicleMantenimientos.sort(function(a,b){
        a = new Date(a.fechaEntera);
        b = new Date(b.fechaEntera);
        return a - b;
      });

      for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
        var item = $scope.selectedVehicleMantenimientos[i]
        $scope.graph.data[0].push(parseInt(item.precio));
        $scope.graph.labels.push(item.fechaRealizado.substring(0, 15));
      }

      $ionicLoading.hide();
    });


  //$scope.graph.series = ['Awake', 'Asleep'];


});
