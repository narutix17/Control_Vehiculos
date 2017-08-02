angular.module('app.controllers')

.controller('gastosController', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {

  var byweek = {};
  var bymonth = {};
  function groupweek(value, index, array){
      d = new Date(value.fechaEntera);
      d = Math.floor(d.getTime()/(1000*60*60*24*7));
      byweek[d]=byweek[d]||[];
      byweek[d].push(value);
  }
  function groupmonth(value, index, array)
  {
      d = new Date(value.fechaEntera);
      d = (d.getFullYear()-1970)*12 + d.getMonth();
      bymonth[d]=bymonth[d]||[];
      bymonth[d].push(value);
  }

  $scope.actGastos = {};

  $scope.graficar = function(){
    bymonth = {};
    byweek = {};
    var tipo = $scope.actGastos.intervalo;
    var f1 = $scope.actGastos.fechaini;
    var f2 = $scope.actGastos.fechafin;

    $scope.selectedVehicleMantenimientos = [];
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

      if (tipo === "Diario"){
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            console.log("PUNTO");
            $scope.graph.data[0].push(parseInt(item.precio));
            $scope.graph.labels.push(item.fechaRealizado.substring(4, 15));
          }
        }
      } else if (tipo === "Semanal") {

        var mantenimientosFiltrados = [];
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            mantenimientosFiltrados.push(item);
          }
        }

        mantenimientosFiltrados.map(groupweek);
        for (var week in byweek){
          var group = byweek[week]
          var weektotal = 0;
          for (var i in group){
            weektotal += parseInt(group[i].precio);
          }
          $scope.graph.data[0].push(weektotal);
          $scope.graph.labels.push(week);
        }

      } else {
        var mantenimientosFiltrados = [];
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            mantenimientosFiltrados.push(item);
          }
        }

        mantenimientosFiltrados.map(groupmonth);
        for (var month in bymonth){
          var group = bymonth[month]
          var monthtotal = 0;
          for (var i in group){
            monthtotal += parseInt(group[i].precio);
          }
          $scope.graph.data[0].push(monthtotal);
          $scope.graph.labels.push(month);
        }
      }


    });
  }

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
        $scope.graph.labels.push(item.fechaRealizado.substring(4, 15));
      }

      $ionicLoading.hide();
    });

});