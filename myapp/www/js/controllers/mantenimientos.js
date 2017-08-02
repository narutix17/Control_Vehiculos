//Mantenimientos.js
//controlador para mostrar y buscar los mantenimientos de los vehiculos 


angular.module('app.controllers')

.controller('DBControllerMantenimientos', function($scope, $cordovaSQLite, $rootScope, $ionicLoading) {
  //funcion para esperar mientras cargan los datos de la pagina 
  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  
  //
  var query2 = "SELECT * FROM mantenimiento";
  $cordovaSQLite.execute(db, query2).then(function(res){
    for (var f=0; f<res.rows.length; f++) {
      console.log("todas ids: "+res.rows.item(f).id_m);
    }
  });

  //query para obtener los mantenimientos y servicios de un vehiculo en especifico por id
  var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";
    $scope.selectedVehicleMantenimientos = [];
    $scope.vehicleMantenimientos = []; //arreglo para los mantenimientos no repetidos por fehca
    $scope.vehicleInfoMantenimientos = []; //arreglo para los mantenimientos repetidos por fecha
    $scope.temporalSave = []; //arreglo para guardar temporalmente mi arreglo de mantenimientos no repetidos por fecha
    $scope.prueba = [];
    //se ejecuta el query con el id del vehiculo en el que se haya ingresado de la lista de vehiculos
    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
        if (res.rows.length > 0){ 
          for (var i=0; i<res.rows.length; i++) { //se recorre todo el arreglo que dio como resultado el query
            $scope.fehcaRealiz = res.rows.item(i).fechaRealizado; 
            $scope.fecha = new Date($scope.fehcaRealiz); //se transforma la fecha(de string) a tipo Date

            $scope.selectedVehicleMantenimientos.push({ //se pone en un arreglo los datos del mantenimiento
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
          // se introduce los primeros items(esto para posteriormente comparar si se repiten las fechas) de mantenimiento a los arreglos 
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
          $scope.vehicleInfoMantenimientos.push({
            nombre: res.rows.item(0).nombre,
            id: res.rows.item(0).id_m,
            idServicio: res.rows.item(0).idServicio,
            detalle: res.rows.item(0).detalle,
            precio: res.rows.item(0).precio,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(0).fechaRealizado.substring(0, 15)
          });
          for(var j=0; j<res.rows.length; j++){ //recorro nuevamente la respuesta del query para buscar repetidos por fecha
            cont = cont + 1; //variable usada ya ue el "for" se ejecuta asincronicamente
            var num = 0; // variable usada para saber si no hay fecha repetida al comparar todas

            if (res.rows.length > cont){
              for(var k=0; k<cont; k++){ 

                if((res.rows.item(cont).fechaRealizado.substring(0, 15)) == (res.rows.item(k).fechaRealizado.substring(0, 15))){

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
                  num = num + 1;
                }
              }
            }
            if(num == cont){ //se ingresa si no se ha repetido la fecha para guardar los datos en su respectivo arreglo

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

              $scope.vehicleInfoMantenimientos.push({
                nombre: res.rows.item(cont).nombre,
                id: res.rows.item(cont).id_m,
                idServicio: res.rows.item(cont).idServicio,
                detalle: res.rows.item(cont).detalle,
                precio: res.rows.item(cont).precio,
                fecha: $scope.fecha,
                fechaRealizado: res.rows.item(cont).fechaRealizado.substring(0, 15)
              });
              $scope.prueba.push({
                fecha: $scope.fecha
              });
            }
          }
        }
        $scope.temporalSave = $scope.vehicleMantenimientos;

        $ionicLoading.hide();
        //funcion para ordenar las fechas 
        $scope.prueba.sort(function(a,b){
          return new Date(a.fecha) - new Date(b.fecha);
        });

    });

  
    // funcion usada para el despliegue de los items por fecha
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

    // funcion para buscar un mantenimiento por fecha
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

