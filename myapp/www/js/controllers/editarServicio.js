/**
 * Controlador utilizado para editar servicios de un vehiculo ya creado.
 * Utilizado en: editarServicio.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')


app.controller("EditarServicio", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', '$cordovaLocalNotification', '$ionicPopup', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout, $cordovaLocalNotification, $ionicPopup){


    $scope.servicioEditado = {};

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.$watch(function(){
      return $rootScope.chosenService[0].ultimoRealizado;
    }, function(){
      $ionicLoading.hide();

      $scope.putSize();
    });

    // Editar un servicio de la base de datos
    $scope.editarServicio = function(){

      console.log("Editando servicio");
      var query = "UPDATE servicio SET idTipoIntervalo=?, intervalo=?, ultimoRealizado=? WHERE id=?"
      var idTipo = 2;
      $cordovaSQLite.execute(db, query, [$scope.servicioEditado.tipo_intervalo, $scope.servicioEditado.intervalo, $scope.servicioEditado.ultimoRealizado, $rootScope.chosenService[0].id]).then(function(res){
        console.log("SERVICIO EDITADO");
        console.log("$rootScope.chosenService.servTipo: "+$rootScope.chosenService[0].servTipo);
        if ($rootScope.chosenService[0].servTipo == "Fecha"){
          console.log("entra aca 1");
          var fecha = new Date($scope.servicioEditado.ultimoRealizado.replace(/-/g, '\/'));
          sumarDias(fecha, $scope.servicioEditado.intervalo)
          restarDias(fecha, 1);
          var hora = Math.floor(Math.random() * (20 - 8)) + 8;
          fecha.setHours(hora);
          console.log("la fecha sera: "+fecha);
          var now = new Date().getTime();
          var _5_SecondsFromNow = new Date(now + 15 * 1000);
          console.log("este es el id: "+$rootScope.chosenService[0].nombre+$rootScope.chosenVehicle.placa);
          cordova.plugins.notification.local.update({
                id: $rootScope.chosenService[0].nombre+$rootScope.chosenVehicle.placa,
                title: "Servicio a Realizar Mañana",
                at: _5_SecondsFromNow

            });
                console.log('Updated Notification Every');
        } else {
          console.log("entra aca 2");
          console.log("$scope.servicioEditado.tipo_intervalo: "+$scope.servicioEditado.tipo_intervalo)
          if($scope.servicioEditado.tipo_intervalo == "Fecha"){
            console.log("entra aca 3");
            $scope.notificacion($rootScope.chosenVehicle.placa, $rootScope.chosenVehicle.alias, $rootScope.chosenVehicle.marca, $rootScope.chosenVehicle.id, $scope.servicioEditado.ultimoRealizado, $rootScope.chosenService[0].nombre, $scope.servicioEditado.intervalo);
          }
        }
      });

    }

    // funcion para modificar el html segun la opcion escogida en el select con id "ciclo"
  $scope.onChanged = function(){
    var ciclo = $("#ciclo").val();
    if (ciclo == "Kilometraje"){
      document.getElementById("km").innerHTML = "kilometros";
      document.getElementById("kof").innerHTML = "Kilometraje de ultimo Mantenimiento:";
      var km = document.getElementById("kilfec");
      km.type = "number";

    }else{
      document.getElementById("km").innerHTML = "dias";
      document.getElementById("kof").innerHTML = "Fecha de ultimo Mantenimiento:";
      var date = document.getElementById("kilfec");
      date.type = "date";
      //document.getElementById("input_id").attributes["type"].value = "text";
    }
    $scope.putSize();
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.4em");
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.2em");
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.1em");
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

    $scope.fecha = new Date(ultimoFechaServicio.replace(/-/g, '\/'));
    var diaNotificacion = $scope.fecha;
    sumarDias(diaNotificacion, intervaloServicio)
    restarDias(diaNotificacion, 1);
    var hora = Math.floor(Math.random() * (20 - 8)) + 8;
    diaNotificacion.setHours(hora);
    console.log("la fecha será: "+diaNotificacion);

    var now = new Date().getTime();
    var _5_SecondsFromNow = new Date(now + 5 * 1000);
    $cordovaLocalNotification.schedule({
      id: nombreServicio+placa,
      //date: _5_SecondsFromNow,
      date: dianotificacion,
      message: "Toque para ingresar a los servicios por realizar",
      title: "Servicio a Realizar Mañana",
      sound: null,
      icon: 'res://icononotificacion.png'
    }).then(function () {
      console.log("Notification Set");
    });

    // Join BBM Meeting when user has clicked on the notification
    cordova.plugins.notification.local.on("click", function(state) {
      $state.go('tabsController.proximosMantenimientos');
      $scope.servicioPopUp(nombreServicio, alias, placa, marca, idVehiculo);
      console.log("si pasaaaaaaaa");

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
    console.log("funcionaaaa1");
    var query = "SELECT intervalo FROM servicio WHERE idVehiculo=? and nombre=?";
    $cordovaSQLite.execute(db, query, [id, nombre]).then(function(res){
      console.log("funcionaaaa2");
      var intervalo = res.rows.item(0).intervalo;
      console.log("intervalo: " + res.rows.item(0).intervalo);
      var nuevoIntervalo = intervalo + intervaloAct;
      console.log("nuevIintervalo: " + nuevoIntervalo);
      var idInt = parseInt(id);
      console.log("funcionaaaa3: "+idInt);

      var query2 = "UPDATE servicio SET intervalo=? WHERE idVehiculo=? and nombre=?";
      $cordovaSQLite.execute(db, query2, [ nuevoIntervalo, idInt, nombre]).then(function(res2){
        console.log("Actualizado el intervalo con exito");
      });
    });
  }



}]);
