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
        templateUrl: 'templates/listaDeVehiculos.html',
        controller: 'listaDeVehiculosCtrl'
      }
    }
  })

  .state('tabsController.agregarVehiculo', {
    url: '/vehiculos/crear',
    views: {
      'tab4': {
        templateUrl: 'templates/agregarVehiculo.html',
        controller: 'agregarVehiculoCtrl'
      }
    }
  })

  .state('tabsController.agregarServicioPersonalizado', {
    url: '/tabs/vehiculos/crear/agregarservicio',
    views: {
      'tab4': {
        templateUrl: 'templates/agregarServicioPersonalizado.html',
        controller: 'agregarServicioPersonalizadoCtrl'
      }
    }
  })

  .state('tabsController.proximosMantenimientos', {
    url: '/tabs/vehiculos/proximosMantenimientos',
    views: {
      'tab5': {
        templateUrl: 'templates/proximosMantenimientos.html',
        controller: 'proximosMantenimientosCtrl'
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
        templateUrl: 'templates/informaciN.html',
        controller: 'informaciNCtrl'
      }
    }
  })

  .state('tabsController2.mantenimiento', {
    url: '/mantenimiento',
    views: {
      'tab2': {
        templateUrl: 'templates/mantenimiento.html',
        controller: 'mantenimientoCtrl'
      }
    }
  })

  .state('tabsController2.gastos', {
    url: '/gastos',
    views: {
      'tab3': {
        templateUrl: 'templates/gastos.html',
        controller: 'gastosCtrl'
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
        templateUrl: 'templates/nuevoMantenimiento.html',
        controller: 'nuevoMantenimientoCtrl'
      }
    }
  })

  .state('agregarServicioPersonalizado', {
    url: '/agregarServicioP',
    templateUrl: 'templates/agregarServicioPersonalizado.html',
    controller: 'agregarServicioPersonalizadoCtrl'
  })

  .state('configuraciNDeVisualizaciN', {
    url: '/configuracionVisual',
    templateUrl: 'templates/configuraciNDeVisualizaciN.html',
    controller: 'configuraciNDeVisualizaciNCtrl'
  })

  .state('inicio', {
    url: '/inicio',
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('enviarCorreo', {
    url: '/enviarCorreo',
    templateUrl: 'templates/enviarCorreo.html',
    controller: 'enviarCorreoCtrl'
  })

  .state('nuevaContraseA', {
    url: '/nuevaContraseña',
    templateUrl: 'templates/nuevaContraseA.html',
    controller: 'nuevaContraseACtrl'
  })

  .state('registrarse', {
    url: '/registrarse',
    templateUrl: 'templates/registrarse.html',
    controller: 'registrarseCtrl'
  })

  .state('infoServicio', {
    url: '/pageis',
    templateUrl: 'templates/infoServicio.html',
    controller: 'infoServicioCtrl'
  })

$urlRouterProvider.otherwise('/inicio')


});