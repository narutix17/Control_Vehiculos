angular.module('app.controllers')

.controller('showPopUpCtrl', function($scope, $cordovaSQLite, $rootScope, $ionicPopup, $timeout, $state){


  $scope.eliminarVehiculo = function(placa){
    var query = "DELETE FROM vehiculo WHERE placa = ?";
    $cordovaSQLite.execute(db, query, [placa]).then(function(result) {
      console.log("Vehiculo Eliminado");
    }, function(error){
      console.log(error);
    });
  }

  placa = $rootScope.chosenVehicle.placa;

  // PopUp para el boton registrarse en registrarse.html
  $scope.puRegistrarse = function() {
    var alertPopup = $ionicPopup.confirm({
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
    

    var alertaPopup = $ionicPopup.confirm({
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
    alertaPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  $scope.puEVehiculo = function() {
    

    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Vehículo',
      template: 'Esta seguro que desea eliminar este vehículo?',
      buttons: [
         {
            text: 'Aceptar',
            onTap: function(e){
               $scope.eliminarVehiculo(placa);
               $state.go('tabsController.listaDeVehiculos');  //al presionar el boton redirige a la pagina login
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

