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
      'tab4': {
        templateUrl: 'templates/listaDeVehiculos.html'        
      }
    }
  })

  .state('tabsController.agregarVehiculo', {
    url: '/vehiculos/crear',
    views: {
      'tab4': {
        templateUrl: 'templates/agregarVehiculo.html'
      }
    }
  })

  .state('tabsController.agregarServicioPersonalizado', {
    url: '/tabs/vehiculos/crear/agregarservicio',
    views: {
      'tab4': {
        templateUrl: 'templates/agregarServicioPersonalizado.html'
      }
    }
  })

  .state('tabsController.proximosMantenimientos', {
    url: '/tabs/vehiculos/proximosMantenimientos',
    views: {
      'tab5': {
        templateUrl: 'templates/proximosMantenimientos.html'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })




      .state('tabsController2.informaciN', {
    url: '/informacion',

    views: {
      'tab1': {
        templateUrl: 'templates/informaciN.html'
      }
    }
  })

  .state('tabsController2.mantenimiento', {
    url: '/mantenimiento',
    views: {
      'tab2': {
        templateUrl: 'templates/mantenimiento.html'
      }
    }
  })

  .state('tabsController2.gastos', {
    url: '/gastos',
    views: {
      'tab3': {
        templateUrl: 'templates/gastos.html'
      }
    }
  })

  .state('tabsController2', {
    url: '/tabs2',
    templateUrl: 'templates/tabsController2.html',
    abstract:true
  })

  .state('tabsController2.nuevoMantenimiento', {
    url: '/nuevoMantenimiento',
    views: {
      'tab2': {
        templateUrl: 'templates/nuevoMantenimiento.html'
      }
    }
  })

  .state('agregarServicioPersonalizado', {
    url: '/agregarServicioP',
    templateUrl: 'templates/agregarServicioPersonalizado.html'
  })

  .state('configuraciNDeVisualizaciN', {
    url: '/configuracionVisual',
    templateUrl: 'templates/configuraciNDeVisualizaciN.html'
  })

  .state('inicio', {
    url: '/inicio',
    templateUrl: 'templates/inicio.html'
  })

  .state('infoServicio', {
    url: '/pageis',
    templateUrl: 'templates/infoServicio.html'
  })

  .state('editarServicioNuevo', {
    url: '/editarServicioNuevo',
    templateUrl: 'templates/editarServicioNuevo.html'
  })

  .state('editarServicio', {
    url: '/editarServicio',
    templateUrl: 'templates/editarServicio.html'
  })

  .state('modificarInformacion', {
    url: '/modificarInformacion',
    templateUrl: 'templates/modificarInformacion.html'
  })

  $urlRouterProvider.otherwise('/inicio')


});
