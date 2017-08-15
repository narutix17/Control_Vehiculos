//controlador showPopUp
//Controlador usado para mostrar los PopUp en la vista de Informacion del vehiculo

angular.module('app.controllers')


.controller('enviarCorreo', function($scope, $cordovaSQLite, $rootScope, $cordovaLocalNotification, $timeout, $state, $ionicPopup){

  $scope.pruebas = localStorage.getItem("tiempos");

  $scope.notificacion = function(x){
  // Schedule notification for tomorrow to remember about the meeting
    console.log("si funciona");
    
    console.log("pruebaa: "+$scope.pruebas);
    //x = $scope.pruebas[0];
    //console.log("estaaaaaaaaaaaaaaaaaaaaaa es laaaaaaaaaaaaaaaa x: "+x);
    //var alarmTime = new Date();
    //alarmTime.setMinutes(alarmTime.getMinutes() + 1);
    var now = new Date().getTime();
    var _5_SecondsFromNow = new Date(now + x * 1000);
    $cordovaLocalNotification.add({
      id: x,
      date: _5_SecondsFromNow,
      message: x+"Toque para ingresar a los servicios por realizar",
      title: "Servicio a Realizar Mañana",
      sound: null
    }).then(function () {
      alert("Notification Set");
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function(state) {
      //$state.go('tabsController.proximosMantenimientos');
      //alert("funca bien :D");
      //var data = JSON.parse(state.data);
      //window.location.href = data.url;
      $state.go('tabsController.proximosMantenimientos');
      $scope.probando();
      //$timeout(function(){
      //  $state.go('tabsController.proximosMantenimientos');
      //},0);
      
    }, this);

    cordova.plugins.notification.local.on("trigger", function () {
        console.log("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        $scope.pruebas1 = [3,4,5,6];
        console.log("pruebaa: "+$scope.pruebas1);
        $scope.pruebas1.splice(0, 1);
        localStorage.setItem("tiempos", $scope.pruebas);
        console.log("pruebaa: "+$scope.pruebas);
        // After 10 minutes update notification's title 
        //alert("trigeriada");
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: x,
                title: "Servicio a Realizar Hoy"
            });
        }, 20000);
    });
  }

  $scope.probando = function() {
    
    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Vehículo',
      template: 'Está seguro que desea eliminar el vehículo ',
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
          text: 'cancelar'
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };


});

