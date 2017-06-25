angular.module('app.controllers')
/**
 * Controller for Adding Vehicle operations
 */
.controller("DBControllerAgregarVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

  $scope.newService = {}

  /**
   * Scope methods excecuted before entering the view that implements the controller
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log("INGRESANDO A LA VISTA DE AGREGAR VEHICULO");
    if ($rootScope.predeterminadosAgregados){
        $scope.agregarServiciosPredeterminadosALaLista();
        $rootScope.predeterminadosAgregados = false;
    }
  });

  /**
   * Create Vehicle method. Recieve the form model located in "agregarVehiculo.html"
   */
  $scope.crearVehiculo = function(){
    var query = "INSERT INTO vehiculo (idTipo, color, placa, marca, alias, año, kilometraje, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [1, $scope.newColor, $scope.newPlaca, $scope.newMarca, $scope.newAlias, $scope.newYear, $scope.newKilometraje, ""]).then(function(result) {
      console.log("Vehiculo Agregado");
      console.log($rootScope.serviciosParaAgregar);
      // AGREGAR LOS SERVICIOS DE LA LISTA AL VEHICULO $rootScope.serviciosParaAgregar

      // Una vez finalizado el query       $rootScope.serviciosParaAgregar = [];
    }, function(error){
      console.log(error);
    });
  }

  $scope.agregarServiciosPredeterminadosALaLista = function(){
      console.log("AGREGANDO SERVICIOS A LA LISTA DEL VEHICULO");
      $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
      });
      $rootScope.serviciosParaAgregar = $rootScope.serviciosParaAgregar.concat($rootScope.serviciosPredeterminados);
      $ionicLoading.hide();
  }

  $scope.eliminarServicioDeLaLista = function(servNombre){
      $rootScope.serviciosParaAgregar = $rootScope.serviciosParaAgregar.filter(function(serv){
          return serv.nombre !== servNombre;
      });
  }

  $scope.agregarServicioALista = function(){
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    console.log($scope.newService.nombre);
    $rootScope.serviciosParaAgregar.push({
        nombre: $scope.newService.nombre,
        tipo_intervalo: $scope.newService.servTipo,
        intervalo: $scope.newService.intervalo,
        ultimoRealizado: $scope.newService.ultimoRealizado
    })

    $ionicLoading.hide();

  }


}]);
