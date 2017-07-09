angular.module('app.controllers')


.controller('showPopUpCtrl', function($scope, $ionicPopup, $timeout, $state) {

  // PopUp para el boton registrarse en registrarse.html
  $scope.puRegistrarse = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Registrarse', //titulo
      template: 'Cuenta Registrada exitosamente', //mensaje
      buttons: [
         {
            text: 'Ok',  //boton ok 
            onTap: function(e){  
               $state.go('login');  //al presionar el boton redirige a la pagina login
            }
         }
      ]
    });
    alertPopup.then(function(res) {
      console.log('popup registrarse');
    });
  };

  // PopUp para el boton restablecer en nuevaContraseña.html
  $scope.puContrasena = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Nueva Contraseña',
      template: 'Contraseña cambiada exitosamente',
      buttons: [
         {
            text: 'Ok',
            onTap: function(e){
               $state.go('login');  //al presionar el boton redirige a la pagina login
            }
         }
      ]
    });
    alertPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  $scope.puEliminarVehiculo = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Eliminar Vehiculo',
      template: 'Está seguro que desea eliminar este vehículo?',
      buttons:[
        {
          text: 'Aceptar'
          onTap: function(e){
            $scope.eliminarVehiculo('{{item.placa}}');
          }
        },
        {
          text: 'Cancelar'
        }             
      ]
    });
    alertPopup.then(function(res) {
      console.log('popup eliminar vehiculo');
    });
  };

  $scope.puEliminarServicio = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Eliminar Servicio',
      template: 'Está seguro que desea eliminar este servicio?',
      buttons:[
        {
          text: 'Aceptar'
        },
        {
          text: 'Cancelar'
        }             
      ]
    });
    alertPopup.then(function(res) {
      console.log('popup eliminar servicio');
    });
  };


});

