/**
 * Controlador utilizado para mostrar los proximos mantenimientos y realizar la busqueda.
 * Utilizado en:
 * Version: 1.0
 * Creador: Jose Cedeno
 * Editores:
 */

angular.module('app.controllers')


.controller('proximosMantenimientos', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout, $ionicPopup) {
  //moment.locale('es');
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var buscar = true;
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
                alias: resp.rows.item(f).alias,
                kilometraje: resp.rows.item(f).kilometraje
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
      $scope.selectedVehicleMantenimientosKm = [];
      $scope.selectedVehicleMantenimientosFecha = [];
      var x = 2;
      var y = -2;
      $cordovaSQLite.execute(db, query).then(function(res){ //se ejecuta el query
          if (res.rows.length > 0){
            console.log("cantidad: "+res.rows.length);
          for(var i=0; i<res.rows.length; i++){
            console.log("tipo: "+res.rows.item(i).idTipoIntervalo);
            if (res.rows.item(i).idTipoIntervalo == "Fecha"){ //condicion para verificar ue el tipo de intervalo sea por fecha

              $scope.fecha = new Date(res.rows.item(i).ultimoRealizado);
              console.log("fechaa1: "+$scope.CurrentDate.toString().substring(0, 15));
              console.log("fechaa2: "+$scope.fecha.toString().substring(0, 15));

              console.log("fecha3: "+sumarDias($scope.fecha, res.rows.item(i).intervalo+1)); //se suma los dias

              if ($scope.CurrentDate < $scope.fecha){ //condicion para solo obtener los servicios de fechas proximas

                for(var j=0; j<$scope.misvehiculos.length; j++){ //se recorre el arreglo de vehiculos para obtener sus datos 
                  if ($scope.misvehiculos[j].id == res.rows.item(i).idVehiculo){
                    
                    
                    $scope.selectedVehicleMantenimientosFecha.push({ //se coloca en el arreglo los datos a presentar en la vista(html)
                      fecha: $scope.fecha,
                      idtoStyle: x,
                      idtoStyle2: y,
                      alias: $scope.misvehiculos[j].alias,
                      placa: $scope.misvehiculos[j].placa,
                      mostrar: $scope.fecha.toLocaleDateString("es-MX", options),
                      fechaRealizado: $scope.fecha.toLocaleDateString("es-MX", options),
                      nombre: res.rows.item(i).nombre
                    });
                    x=x+1;
                    y=y-1;
                  }
                }

              }
            } else {
              if (res.rows.item(i).ultimoRealizado != "NaN"){
                var km = parseInt(res.rows.item(i).ultimoRealizado);
                console.log("km: "+km);
                var intervalo = res.rows.item(i).intervalo;
                console.log("intervalo: "+intervalo);
                var kmMantenimiento = km + intervalo;
                console.log("kmMantenimiento: "+kmMantenimiento);
                for (var k=0; k<$scope.misvehiculos.length; k++){
                  if ($scope.misvehiculos[k].id == res.rows.item(i).idVehiculo){
                    var kilometraje = $scope.misvehiculos[k].kilometraje;
                    console.log("kilometraje: "+kilometraje);
                    var kmRestante = kmMantenimiento - kilometraje;
                    console.log("kmRestante: "+kmRestante);
                    if (kmRestante > 0){
                      console.log("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                      $scope.selectedVehicleMantenimientosKm.push({ //se coloca en el arreglo los datos a presentar en la vista(html)
                        fecha: kmRestante,
                        idtoStyle: x,
                        idtoStyle2: y,
                        alias: $scope.misvehiculos[k].alias,
                        placa: $scope.misvehiculos[k].placa,
                        mostrar: "Kilometros restantes: "+kmRestante,
                        fechaRealizado: $scope.fecha.toString().substring(0, 15),
                        nombre: res.rows.item(i).nombre
                      });
                      x=x+1;
                      y=y-1;
                    }
                  }
                }
              }
            }
          }     
            
          
          }
          if($scope.selectedVehicleMantenimientosFecha.length == 0){
            $scope.popUpFechas();
          }
          $scope.selectedVehicleMantenimientos = $scope.selectedVehicleMantenimientosFecha;
          $scope.temporalSave = $scope.selectedVehicleMantenimientos;
          $ionicLoading.hide();
          $scope.putSize();
      });

  }


  $scope.onChanged = function(){
    var ciclo = $("#vista").val();
    if (ciclo == "Kilometraje"){
      $scope.selectedVehicleMantenimientos = $scope.selectedVehicleMantenimientosKm;
      buscar = false;
      if ($scope.selectedVehicleMantenimientos.length == 0){
        $scope.popUpKilometros();
      }
    }else{
      $scope.selectedVehicleMantenimientos = $scope.selectedVehicleMantenimientosFecha;
      buscar = true;
      if ($scope.selectedVehicleMantenimientos.length == 0){
        $scope.popUpFechas();
      }
    }
    $scope.putSize();
  }

  // funcion para obtener la informacion de fecha precio y detalle
    $scope.setInfo = function(fecha, precio, detalle){
      $rootScope.setInfoMant = {}
      $rootScope.setInfoMant.fecha = fecha;
      $rootScope.setInfoMant.precio = precio;
      $rootScope.setInfoMant.detalle = detalle;
    }


  //funcion para buscar los proximos mantenimientos
  $scope.buscar = function(){
    if (buscar == true){
      var m = 2;
      var p = -2;
      $scope.selectedVehicleMantenimientos = $scope.temporalSave;
      fecha = document.getElementById("fecha").value;
      //console.log(fecha);
      $scope.fecha = new Date(fecha.replace(/-/g, '\/'));
      $scope.arrayTemporal = [];
      //$scope.arrayTemporal = $scope.vehicleMantenimientos;

      for(var i=0; i<$scope.selectedVehicleMantenimientos.length; i++){
        //console.log("fecha1: "+$scope.fecha.toString().substring(0, 15));
        //console.log("fecha2: "+$scope.selectedVehicleMantenimientos[i].fechaRealizado);
        if($scope.fecha.toString().substring(0, 15) == $scope.selectedVehicleMantenimientos[i].fecha.toString().substring(0, 15)){
          var existe = true;
          $scope.arrayTemporal.push({
            nombre: $scope.selectedVehicleMantenimientos[i].nombre,
            placa: $scope.selectedVehicleMantenimientos[i].placa,
            idtoStyle: m,
            idtoStyle2: p,
            fecha: $scope.fecha,
            mostrar: $scope.selectedVehicleMantenimientos[i].fechaRealizado,
            alias: $scope.selectedVehicleMantenimientos[i].alias,
            fechaRealizado: $scope.selectedVehicleMantenimientos[i].fechaRealizado
          });
          m=m+1;
          p=p-1;
        }
      }
      if(!existe){
        $scope.popUpNoFechaMostrar();
      }
      $scope.selectedVehicleMantenimientos = "";
      $scope.selectedVehicleMantenimientos = $scope.arrayTemporal;
      $ionicLoading.hide();
      $scope.putSize();
    } else {
      $scope.popUpBuscarPorFecha();
    }
  }

  $scope.popUpBuscarPorFecha = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error de busqueda',
      template: 'Solo puede realizar busqueda por fechas'
    });
    alertPopup.then(function(res) {
      console.log('solo por fechas');
    });
  };

  $scope.popUpKilometros = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Mantenimientos por Kilometros',
      template: 'No hay próximos mantenimientos por kilometro para mostrar'
    });
    alertPopup.then(function(res) {
      console.log('solo por fechas');
    });
  };

  $scope.popUpFechas = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Mantenimiento por Fecha',
      template: 'No hay próximos mantenimientos por Fecha para mostrar'
    });
    alertPopup.then(function(res) {
      console.log('solo por fechas');
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
    console.log("se vieneee");
    $timeout(function(){  
      if ($rootScope.sizeGrande == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.3em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.3em");
        }
        for(var k=0;k<$scope.selectedVehicleMantenimientos.length;k++){
          var x = $scope.selectedVehicleMantenimientos[k].idtoStyle;
          document.getElementById(x).setAttribute("style","font-size: 1.4em");
        }
        for(var l=0;l<$scope.selectedVehicleMantenimientos.length;l++){
          var y = $scope.selectedVehicleMantenimientos[l].idtoStyle2;
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
        for(var k=0;k<$scope.selectedVehicleMantenimientos.length;k++){
          var x = $scope.selectedVehicleMantenimientos[k].idtoStyle;
          document.getElementById(x).setAttribute("style","font-size: 1.2em");
        }
        for(var l=0;l<$scope.selectedVehicleMantenimientos.length;l++){
          var y = $scope.selectedVehicleMantenimientos[l].idtoStyle2;
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
        for(var k=0;k<$scope.selectedVehicleMantenimientos.length;k++){
          var x = $scope.selectedVehicleMantenimientos[k].idtoStyle;
          document.getElementById(x).setAttribute("style","font-size: 1.1em");
        }
        for(var l=0;l<$scope.selectedVehicleMantenimientos.length;l++){
          var y = $scope.selectedVehicleMantenimientos[l].idtoStyle2;
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
