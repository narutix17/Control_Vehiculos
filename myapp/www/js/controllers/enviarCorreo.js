//controlador showPopUp
//Controlador usado para mostrar los PopUp en la vista de Informacion del vehiculo

angular.module('app.controllers')


.controller('enviarCorreo', function($scope, $cordovaSQLite, $rootScope, $cordovaLocalNotification, $timeout, $state, $location){

  $location.path('/tabs/tabs/vehiculos');
  $rootScope.$apply();

});

