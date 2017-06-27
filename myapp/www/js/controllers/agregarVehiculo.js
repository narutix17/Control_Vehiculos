angular.module('app.controllers')
/**
 * Controller for Adding Vehicle operations
 */
.controller("DBControllerAgregarVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

  $scope.newService = {}
  $scope.newVehicle = {}

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
    var servicios = $rootScope.serviciosParaAgregar;
    var query = "INSERT INTO vehiculo (idTipo, color, placa, marca, alias, año, kilometraje, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [1, $scope.newVehicle.newColor, $scope.newVehicle.newPlaca, $scope.newVehicle.newMarca, $scope.newVehicle.newAlias, $scope.newVehicle.newYear, $scope.newVehicle.newKilometraje, ""]).then(function(result) {
      console.log("Vehiculo Agregado");
      console.log(servicios);
      var query2 = "SELECT * FROM vehiculo WHERE placa = ? "
      $cordovaSQLite.execute(db, query2, [$scope.newVehicle.newPlaca]).then(function(result) {
          var idVehiculo = result.rows.item(0).id;
          for (i = 0; i < servicios.length; i++){
              var serv = servicios[i];
              var servQuery = "INSERT INTO servicio (idTipo, idTipoIntervalo, idVehiculo, nombre, intervalo, ultimoRealizado) VALUES (?, ?, ?, ?, ?, ?);"
              $cordovaSQLite.execute(db, servQuery, [2, serv.tipo_intervalo, idVehiculo, serv.nombre, serv.intervalo, serv.ultimoRealizado ]).then(function(result) {
                  console.log("Servicio Agregado");
              });
          }
      });
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
