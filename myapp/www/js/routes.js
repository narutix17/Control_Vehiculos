angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.listaDeVehiculos', {
    url: '/tabs/vehiculos',
    views: {
      'tab1': {
        templateUrl: 'templates/listaDeVehiculos.html',
        controller: 'listaDeVehiculosCtrl'
      }
    }
  })

  .state('tabsController.agregarVehiculo', {
    url: '/tabs/vehiculos/crear',
    views: {
      'tab1': {
        templateUrl: 'templates/agregarVehiculo.html',
        controller: 'agregarVehiculoCtrl'
      }
    }
  })

  .state('tabsController.agregarServicioPersonalizado', {
    url: '/tabs/vehiculos/crear/agregarservicio',
    views: {
      'tab1': {
        templateUrl: 'templates/agregarServicioPersonalizado.html',
        controller: 'agregarServicioPersonalizadoCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/tabs/tabs/vehiculos')


});