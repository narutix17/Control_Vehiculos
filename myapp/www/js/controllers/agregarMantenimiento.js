/**
 * Controlador utilizado para agregar mantenimientos a un vehiculo
 * Utilizado en: nuevoMantenimiento.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')
/**
 * Controller for an specific Vehicle operations
 */

app.controller("DBControllerAgregarMantenimiento", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', '$cordovaLocalNotification', '$ionicPopup', '$state', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout, $cordovaLocalNotification, $ionicPopup, $state){


    $scope.newMantenimiento = {};

    $scope.$on('$ionicView.afterEnter', function(){
        $scope.putSize();
    });

    $scope.agregarMantenimiento = function(){
        console.log($scope.newMantenimiento.nombreServ);
        var nombreServicio = $scope.newMantenimiento.nombreServ;
        var kilometraDeMantenimiento = $scope.newMantenimiento.kilometraje;

        /*
        if (kilometraDeMantenimiento > $rootScope.chosenVehicle.km){

          var query = "UPDATE vehiculo SET kilometraje=? WHERE id=?";
          console.log(query);
          $cordovaSQLite.execute(db, query, [kilometraDeMantenimiento, $rootScope.chosenVehicle.id]).then(function(result) {
            console.log("Km Actualizado");
          }, function(error){
            console.log(error);
          });
        }
        */

        var servId = "";
        var servNombre = "";
        var servIntervalo = "";
        var servUltimoRealizado = "";
        for (var i = 0; i< $rootScope.selectedVehicleServices.length; i++){
            console.log($rootScope.selectedVehicleServices[i].nombre);
            console.log(nombreServicio);
            if ($rootScope.selectedVehicleServices[i].nombre === nombreServicio){
                servId = $rootScope.selectedVehicleServices[i].id;
                servNombre = $rootScope.selectedVehicleServices[i].nombre;
                servIntervalo = $rootScope.selectedVehicleServices[i].intervalo;
                servUltimoRealizado = $rootScope.selectedVehicleServices[i].ultimoRealizado;
                break;
            }
        }
        console.log(servId);
        var query = "INSERT INTO mantenimiento  (idServicio, detalle, precio, fechaRealizado) VALUES (?, ?, ?, ?)";
        $cordovaSQLite.execute(db, query, [servId, $scope.newMantenimiento.obs, $scope.newMantenimiento.valor ,$scope.newMantenimiento.fecha]).then(function(res){
            console.log("Mantenimiento Agregado");
            var query2 = "UPDATE servicio SET ultimoRealizado=? WHERE id=?";
            $cordovaSQLite.execute(db, query2, [$scope.newMantenimiento.fecha.toString().substring(0, 15), servId]).then(function(res2){
                console.log("Servicio actualizado");
                $scope.notificacion($rootScope.chosenVehicle.placa, $rootScope.chosenVehicle.alias, $rootScope.chosenVehicle.marca, $rootScope.chosenVehicle.id, $scope.newMantenimiento.fecha.toString().substring(0, 15), servNombre, servIntervalo);
            });
            
        });

    }

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
          b[j].setAttribute("style","font-size: 1.3em");
        }
        var h=document.getElementsByTagName('textarea');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.3em");

        } 
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1.3em");
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
        var h=document.getElementsByTagName('textarea');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.15em");
        }
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1.1em");

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
        var h=document.getElementsByTagName('textarea');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1em");
        }
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1em");

        } 
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1em");
        } 
      }
      
    }, 0);
  };

  $scope.popUpInformacion = function() {
    var alertasPopup = $ionicPopup.confirm({
      title: 'Agregar Mantenimiento',
      template: 'Esta seguro que desea registrar este mantenimiento? se actualizará automaticamente la fehca del servicio: "'+$scope.newMantenimiento.nombreServ+'"',
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
               $scope.agregarMantenimiento();
               $state.go('tabsController2.mantenimiento');
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


  //funcion para restar dias a una fecha
  function restarDias(fecha, dias){
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  ////  NOTIFICACIONES   
///////////////////////////////////////////////////////////////////////////////////////////////
  //notificaciones creadas al registrar un nuevo servicio 
  $scope.notificacion = function(placa, alias, marca, idVehiculo, ultimoFechaServicio, nombreServicio, intervaloServicio){
    $scope.informacion = [];
    $scope.fecha = new Date(ultimoFechaServicio.replace(/-/g, '\/'));
    var diaNotificacion = $scope.fecha;
    sumarDias(diaNotificacion, intervaloServicio)
    restarDias(diaNotificacion, 1);
    var hora = Math.floor(Math.random() * (20 - 8)) + 8;
    diaNotificacion.setHours(hora);
    console.log("la fecha será: "+diaNotificacion);

    var now = new Date().getTime();
    var _5_SecondsFromNow = new Date(now + 60 * 1000);
    console.log("ESTE ES EL PRIMER ID: "+nombreServicio+placa);
    $cordovaLocalNotification.schedule({
      id: nombreServicio+placa,
      date: _5_SecondsFromNow,
      //date: diaNotificacion,
      message: "Toque para ingresar a los servicios por realizar",
      title: "Servicio a Realizar Mañana",
      sound: null
    }).then(function () {
      alert("Notification Set");
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function(state) {
      $state.go('tabsController.proximosMantenimientos');
      $scope.servicioPopUp(nombreServicio, alias, placa, marca, idVehiculo);
      
    }, this);

    cordova.plugins.notification.local.on("trigger", function () {
        // After 10 minutes update notification's title 
        //alert("trigeriada");
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: nombreServicio+placa,
                title: "Servicio a Realizar Hoy"
            });
        }, 60000);
    });
  }

  $scope.servicioPopUp = function(servicio, alias, placa, marca, id) {
    
    var alertasPopup = $ionicPopup.confirm({
      title: 'Servicio a Realizar',
      template: 'Tiene que realizar el siguiente servicio: "'+servicio+'", del vehiculo:<br>Alias: '+alias+'<br>Placa: '+placa+'<br>Marca: '+marca,
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
              //angular.element($("#"+idVehiculo)).remove();
              //$scope.eliminarVehiculo(idVehiculo);
              
            }
         },
         {
          text: 'Posponer',
          onTap: function(e){
            $scope.posponer(servicio, id);    
          }
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contrasena');
    });
  };

  $scope.posponer = function(nombre, id) {
    $rootScope.newItem = {};
    var alertasPopup = $ionicPopup.show({
      title: 'Posponer Servicio',
      template: '<p>Ingrese la cantidad de dias que desea posponer el servicio: </p><br><input type="number" ng-model="newItem.aumentarDias">',
      rootScope: this,
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
              //angular.element($("#"+idVehiculo)).remove();
              //$scope.eliminarVehiculo(idVehiculo);
              console.log("diaaaaaaaas: "+$scope.newItem.aumentarDias);
              //return $scope.diasPosponer.aumentarDias;
              $scope.actualizarDiasPosponer(nombre, id, $scope.newItem.aumentarDias);
              $state.go('tabsController.proximosMantenimientos');
            }
         },
         {
          text: 'Cancelar'
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  $scope.actualizarDiasPosponer = function(nombre, id, intervaloAct){
    var query = "SELECT intervalo FROM servicio WHERE idVehiculo=? and nombre=?";
    $cordovaSQLite.execute(db, query, [id, nombre]).then(function(res){
      var intervalo = res.rows.item(0).intervalo;
      var nuevoIntervalo = intervalo + intervaloAct;
      var idInt = parseInt(id);
      var query2 = "UPDATE servicio SET intervalo=? WHERE idVehiculo=? and nombre=?";
      $cordovaSQLite.execute(db, query2, [ nuevoIntervalo, idInt, nombre]).then(function(res2){
        console.log("Actualizado el intervalo con exito");
      });
    });
  }

  $scope.cancelNotification = function (id) {
    $cordovaLocalNotification.isPresent(id).then(function (present) {
        if (present) {
            $cordovaLocalNotification.cancel(id).then(function (result) {
                console.log('Notificacion cancelada');
            });
        } else {
            console.log('no existe notificacion para cancelar');
        }
    });
  };


    }, 0);
  };
}]);
