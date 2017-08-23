/**
 * Controlador utilizado para realizar operaciones que conciernen a los mantenimientos de un vehiculo.
 * Utilizado en: mantenimiento.html
 * Version: 1.0
 * Creador: Jose Cedeno
 * Editores: //
 */
angular.module('app.controllers')


.controller('DBControllerMantenimientos', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicPopup, $state, $timeout, $cordovaLocalNotification, $ionicPopup, $state) {

  //funcion para esperar mientras cargan los datos de la pagina
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
    });

  var query2 = "SELECT * FROM mantenimiento";
  $cordovaSQLite.execute(db, query2).then(function(res){
    for (var f=0; f<res.rows.length; f++) {
      console.log("todas ids: "+res.rows.item(f).id_m);
    }
  });

  // Obtener todos los mantenimientos con su servicio relacionado
  var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";
    console.log(query);

    $scope.selectedVehicleMantenimientos = [];
    $scope.vehicleMantenimientos = []; //arreglo para los mantenimientos no repetidos por fehca
    $scope.vehicleInfoMantenimientos = []; //arreglo para los mantenimientos repetidos por fecha
    $scope.temporalSave = []; //arreglo para guardar temporalmente mi arreglo de mantenimientos no repetidos por fecha
    $scope.prueba = [];
    var x = 2;
    var y = -2;
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
              fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
            });
          }
          var cont = 0;
          var n = 0;
          // se introduce los primeros items(esto para posteriormente comparar si se repiten las fechas) de mantenimiento a los arreglos
          $scope.fehcaRealiz = res.rows.item(0).fechaRealizado;
          $scope.fecha = new Date($scope.fehcaRealiz);
          $scope.vehicleMantenimientos.push({
            nombre: res.rows.item(0).nombre,
            idtoStyle2: y,
            id: res.rows.item(0).id_m,
            idreal: res.rows.item(0).id_m,
            idServicio: res.rows.item(0).idServicio,
            detalle: res.rows.item(0).detalle,
            precio: res.rows.item(0).precio,
            //identif: $scope.ident,
            fecha: $scope.fecha,
            fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
          });
          y=y-1;
          console.log("IDREAL vehicleMantenimientos: "+res.rows.item(0).id_m);
          $scope.vehicleInfoMantenimientos.push({
            nombre: res.rows.item(0).nombre,
            idtoStyle: x,
            id: res.rows.item(0).id_m,
            idreal: res.rows.item(0).id_m,
            idServicio: res.rows.item(0).idServicio,
            detalle: res.rows.item(0).detalle,
            precio: res.rows.item(0).precio,
            fecha: $scope.fecha,
            fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
          });
          x=x+1;
          console.log("IDREAL vehicleInfoMantenimientos: "+res.rows.item(0).id_m);
          for(var j=0; j<res.rows.length; j++){ //recorro nuevamente la respuesta del query para buscar repetidos por fecha
            cont = cont + 1; //variable usada ya ue el "for" se ejecuta asincronicamente
            var num = 0; // variable usada para saber si no hay fecha repetida al comparar todas

            if (res.rows.length > cont){
              for(var k=0; k<cont; k++){

                if((res.rows.item(cont).fechaRealizado.substring(0, 15)) == (res.rows.item(k).fechaRealizado.substring(0, 15))){
                  $scope.fehcaRealiz = res.rows.item(cont).fechaRealizado;
                  $scope.fecha = new Date($scope.fehcaRealiz);
                  $scope.vehicleInfoMantenimientos.push({
                    nombre: res.rows.item(cont).nombre,
                    idtoStyle: x,
                    id: res.rows.item(k).id_m,
                    idreal: res.rows.item(cont).id_m,
                    idServicio: res.rows.item(cont).idServicio,
                    detalle: res.rows.item(cont).detalle,
                    precio: res.rows.item(cont).precio,
                    //identif: $scope.ident,
                    fecha: $scope.fecha,
                    fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
                  });
                  x=x+1;
                  console.log("IDREAL vehicleInfoMantenimientos: "+res.rows.item(cont).id_m);
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
                idtoStyle2: y,
                id: res.rows.item(cont).id_m,
                idreal: res.rows.item(cont).id_m,
                idServicio: res.rows.item(cont).idServicio,
                detalle: res.rows.item(cont).detalle,
                precio: res.rows.item(cont).precio,
                fecha: $scope.fecha,
                fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
              });
              y=y-1;
              console.log("IDREAL vehicleMantenimientos: "+res.rows.item(cont).id_m);
              $scope.vehicleInfoMantenimientos.push({
                nombre: res.rows.item(cont).nombre,
                idtoStyle: x,
                id: res.rows.item(cont).id_m,
                idreal: res.rows.item(cont).id_m,
                idServicio: res.rows.item(cont).idServicio,
                detalle: res.rows.item(cont).detalle,
                precio: res.rows.item(cont).precio,
                fecha: $scope.fecha,
                fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options)
              });
              x=x+1;
              console.log("IDREAL vehicleInfoMantenimientos: "+res.rows.item(cont).id_m);
              $scope.prueba.push({
                fecha: $scope.fecha
              });
            }
          }
        }
        $scope.temporalSave = $scope.vehicleMantenimientos;

        $ionicLoading.hide();
        $scope.putSize();
        //funcion para ordenar las fechas
        $scope.prueba.sort(function(a,b){
          return new Date(a.fecha) - new Date(b.fecha);
        });

    });



    // Buscar mantenimientos
    $scope.buscar = function(){
      var m = 2;
      $scope.vehicleMantenimientos = $scope.temporalSave;
      fecha = document.getElementById("fecha").value;
      $scope.fecha = new Date(fecha.replace(/-/g, '\/'));
      $scope.arrayTemporal = [];
      //$scope.arrayTemporal = $scope.vehicleMantenimientos;
      for(var i=0; i<$scope.vehicleMantenimientos.length; i++){
        if($scope.fecha.toString().substring(0, 15) == $scope.vehicleMantenimientos[i].fecha.toString().substring(0, 15)){
          var existe = true;
          $scope.arrayTemporal.push({
            nombre: $scope.vehicleMantenimientos[i].nombre,
            idtoStyle2: m,
            id: $scope.vehicleMantenimientos[i].id,
            idServicio: $scope.vehicleMantenimientos[i].idServicio,
            detalle: $scope.vehicleMantenimientos[i].detalle,
            precio: $scope.vehicleMantenimientos[i].precio,
            //fecha: $scope.fecha,
            fechaRealizado: $scope.vehicleMantenimientos[i].fechaRealizado
          });
          m=m+1;
        }
      }
      if(!existe){
        $scope.popUpNoFechaMostrar();
      }
      $scope.vehicleMantenimientos = "";
      $scope.vehicleMantenimientos = $scope.arrayTemporal;
      $ionicLoading.hide();
      $scope.putSize();

    }

    //funcion para eliminar un mantenimiento

    $scope.eliminarMantenimiento = function(id, nombre){
      $cordovaLocalNotification.isPresent(nombre+$rootScope.chosenVehicle.placa).then(function (present) {
        if (present) {
            $cordovaLocalNotification.cancel(nombre+$rootScope.chosenVehicle.placa).then(function (result) {
                console.log('Notificacion cancelada');
            });
        } else {
            console.log('no existe notificacion para cancelar');
        }
      });

      var query = "DELETE FROM mantenimiento WHERE id_m = ?";
      $cordovaSQLite.execute(db, query, [id]).then(function(result) {
        console.log("Mantenimiento Eliminado");
      }, function(error){
        console.log(error);
      });
    }


    $scope.popUpEliminarMantenimiento = function(id, nombre) {
    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Mantenimiento',
      template: 'Esta seguro que desea eliminar este mantenimiento? se eliminaran las notificaciones automaticas del servicio: "'+nombre+'" </br> Para recibir notificaciones vuelva a agregar nuevamente un mantenimiento o servicio',

      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
              angular.element($("#"+id)).remove();
              angular.element($("#"+id)).remove();

              $scope.eliminarMantenimiento(id, nombre);

            }
         },
         {
          text: 'cancelar'
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  $scope.popUpNoFechaMostrar = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Busqueda por Fecha',
      template: 'No hay mantenimientos para mostrar en esta fecha'
    });
    alertPopup.then(function(res) {
      console.log('solo por fechas');
    });
  };



  //funcion para cambiar el tamaño de letra de la aplicacion
  $scope.putSize = function () {
    $rootScope.sizeGrande = localStorage.getItem("sizeGrande");
    $rootScope.sizePequeno = localStorage.getItem("sizePequeno");
    $rootScope.sizeMediano = localStorage.getItem("sizeMediano");
    console.log("$rootScope.sizeGrande: "+$rootScope.sizeGrande);
    console.log("$rootScope.sizePequeno: "+$rootScope.sizePequeno);
    console.log("$rootScope.sizeMediano: "+$rootScope.sizeMediano);
    $timeout(function(){
      if ($rootScope.sizeGrande == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.3em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","margin-top: 0px; font-size: 1.4em;");
        }
        for(var k=0;k<$scope.vehicleMantenimientos.length;k++){
          console.log("entra");
          var x = $scope.vehicleMantenimientos[k].idtoStyle2;
          document.getElementById(x).setAttribute("style","font-size: 1.4em");
        }
        for(var l=0;l<$scope.vehicleInfoMantenimientos.length;l++){
          console.log("entra2");
          var y = $scope.vehicleInfoMantenimientos[l].idtoStyle;
          console.log("y: "+y);
          document.getElementById(y).setAttribute("style","font-size: 1.4em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1.3em");
        }
      } else if ($rootScope.sizeMediano == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.15em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.15em");
        }
        for(var k=0;k<$scope.vehicleMantenimientos.length;k++){
          var x = $scope.vehicleMantenimientos[k].idtoStyle2;
          document.getElementById(x).setAttribute("style","font-size: 1.2em");
        }
        for(var l=0;l<$scope.vehicleInfoMantenimientos.length;l++){
          var y = $scope.vehicleInfoMantenimientos[l].idtoStyle;
          console.log("y: "+y);
          document.getElementById(y).setAttribute("style","font-size: 1.2em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1.1em");
        }
      } else if ($rootScope.sizePequeno == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1em");
        }
        for(var k=0;k<$scope.vehicleMantenimientos.length;k++){
          var x = $scope.vehicleMantenimientos[k].idtoStyle2;
          document.getElementById(x).setAttribute("style","font-size: 1.1em");
        }
        for(var l=0;l<$scope.vehicleInfoMantenimientos.length;l++){
          var y = $scope.vehicleInfoMantenimientos[l].idtoStyle;
          console.log("y: "+y);
          document.getElementById(y).setAttribute("style","font-size: 1.1em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1em");
        }
      }

    }, 0);
  };



});
