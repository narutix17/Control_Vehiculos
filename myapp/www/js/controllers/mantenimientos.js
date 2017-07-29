angular.module('app.controllers')

.controller('DBControllerMantenimientos', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {

  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  

  var query2 = "SELECT * FROM mantenimiento";
  $cordovaSQLite.execute(db, query2).then(function(res){
    for (var f=0; f<res.rows.length; f++) {
      console.log("todas ids: "+res.rows.item(f).id_m);
    }
  });

  var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";
    //var query = "SELECT * FROM mantenimiento";
    console.log(query);
    $scope.selectedVehicleMantenimientos = [];
    $scope.vehicleMantenimientos = [];
    $scope.vehicleInfoMantenimientos = [];
    $scope.temporalSave = [];
    console.log($rootScope.chosenVehicle.id);
    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
        console.log("TAMAÑOOOOOO: "+res.rows.length);
        if (res.rows.length > 0){
          for (var i=0; i<res.rows.length; i++) {
            $scope.fehcaRealiz = res.rows.item(i).fechaRealizado;
            $scope.fecha = new Date($scope.fehcaRealiz);
            console.log("i: "+i);
            console.log("ids: "+res.rows.item(i).id_m);
            $scope.selectedVehicleMantenimientos.push({
              nombre: res.rows.item(i).nombre,
              id: res.rows.item(i).id_m,
              idServicio: res.rows.item(i).idServicio,
              detalle: res.rows.item(i).detalle,
              precio: res.rows.item(i).precio,
              fecha: $scope.fecha,
              fechaRealizado: res.rows.item(i).fechaRealizado.substring(0, 15)
            });
          }
          var cont = 0;
          var n = 0;
          //$scope.ident = n;
          $scope.fehcaRealiz = res.rows.item(0).fechaRealizado;
          $scope.fecha = new Date($scope.fehcaRealiz);
          $scope.vehicleMantenimientos.push({
            nombre: res.rows.item(0).nombre,
            id: res.rows.item(0).id_m,
            idServicio: res.rows.item(0).idServicio,
            detalle: res.rows.item(0).detalle,
            precio: res.rows.item(0).precio,
            //identif: $scope.ident,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(0).fechaRealizado.substring(0, 15)
          });
          console.log("ID DE 0: "+res.rows.item(0).id_m);
          $scope.vehicleInfoMantenimientos.push({
            nombre: res.rows.item(0).nombre,
            id: res.rows.item(0).id_m,
            idServicio: res.rows.item(0).idServicio,
            detalle: res.rows.item(0).detalle,
            precio: res.rows.item(0).precio,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(0).fechaRealizado.substring(0, 15)
          });
          for(var j=0; j<res.rows.length; j++){
            cont = cont + 1;
            var num = 0;
            console.log("cont: "+cont);
            if (res.rows.length > cont){
              for(var k=0; k<cont; k++){
                console.log("k: "+k);
                console.log("fehcaRea1: "+res.rows.item(cont).fechaRealizado.substring(0, 15));
                console.log("fechaRea2: "+res.rows.item(k).fechaRealizado.substring(0, 15));
                if((res.rows.item(cont).fechaRealizado.substring(0, 15)) == (res.rows.item(k).fechaRealizado.substring(0, 15))){
                  console.log("ENTRA IF VERDADERO");
                  console.log("ID: "+res.rows.item(k).id_m);
                  //$scope.ident = n;
                  $scope.vehicleInfoMantenimientos.push({
                    nombre: res.rows.item(cont).nombre,
                    id: res.rows.item(k).id_m,
                    idServicio: res.rows.item(cont).idServicio,
                    detalle: res.rows.item(cont).detalle,
                    precio: res.rows.item(cont).precio,
                    //identif: $scope.ident,
                    fecha: $scope.fecha,
                    fechaRealizado: res.rows.item(cont).fechaRealizado.substring(0, 15)
                  });
                }else{
                  console.log("ENTRA IF FALSO");
                  num = num + 1;
                }
              }
            }
            if(num == cont){
              console.log("ENTRA NUM: "+num);
              console.log("ENTRA CONT: "+cont);
              $scope.fehcaRealiz = res.rows.item(cont).fechaRealizado;
              $scope.fecha = new Date($scope.fehcaRealiz);
              $scope.vehicleMantenimientos.push({
                nombre: res.rows.item(cont).nombre,
                id: res.rows.item(cont).id_m,
                idServicio: res.rows.item(cont).idServicio,
                detalle: res.rows.item(cont).detalle,
                precio: res.rows.item(cont).precio,
                fecha: $scope.fecha,
                fechaRealizado: res.rows.item(cont).fechaRealizado.substring(0, 15)
              });
              console.log("ID: "+res.rows.item(cont).id);
              $scope.vehicleInfoMantenimientos.push({
                nombre: res.rows.item(cont).nombre,
                id: res.rows.item(cont).id_m,
                idServicio: res.rows.item(cont).idServicio,
                detalle: res.rows.item(cont).detalle,
                precio: res.rows.item(cont).precio,
                fecha: $scope.fecha,
                fechaRealizado: res.rows.item(cont).fechaRealizado.substring(0, 15)
              });
            }
          }
        }
        $scope.temporalSave = $scope.vehicleMantenimientos;
        console.log("Hola");
        $ionicLoading.hide();
    });

  
 
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
      $scope.vehicleMantenimientos = $scope.temporalSave;
      fecha = document.getElementById("fecha").value;
      $scope.fecha = new Date(fecha.replace(/-/g, '\/'));
      $scope.arrayTemporal = [];
      //$scope.arrayTemporal = $scope.vehicleMantenimientos;
      for(var i=0; i<$scope.vehicleMantenimientos.length; i++){
        if($scope.fecha.toString().substring(0, 15) == $scope.vehicleMantenimientos[i].fechaRealizado){
          $scope.arrayTemporal.push({
            nombre: $scope.vehicleMantenimientos[i].nombre,
            id: $scope.vehicleMantenimientos[i].id,
            idServicio: $scope.vehicleMantenimientos[i].idServicio,
            detalle: $scope.vehicleMantenimientos[i].detalle,
            precio: $scope.vehicleMantenimientos[i].precio,
            //fecha: $scope.fecha,
            fechaRealizado: $scope.vehicleMantenimientos[i].fechaRealizado
          });
        }
      }
      $scope.vehicleMantenimientos = "";
      $scope.vehicleMantenimientos = $scope.arrayTemporal;



    } 
  
});

