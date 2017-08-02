angular.module('app.controllers')
/**
 * Controller for Vehicle operations
 */
.controller("DBControllerVehiculo", ['$scope', '$cordovaSQLite', '$rootScope',  '$ionicLoading', '$ionicPopup', '$ionicModal',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading,$ionicPopup, $ionicModal){

  $rootScope.serviciosParaAgregar = [];
  /**
   * Scope methods excecuted before entering the view that implements the controller
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.cargarVehiculos();
    $scope.cargarPredeterminados();
  });

  /**
   * Create Vehicle method. Recieve the form model located in "agregarVehiculo.html"
   */
  $scope.crearVehiculo = function(){
    var query = "INSERT INTO vehiculo (idTipo, color, placa, marca, alias, año, kilometraje, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [1, $scope.newColor, $scope.newPlaca, $scope.newMarca, $scope.newAlias, $scope.newYear, $scope.newKilometraje, ""]).then(function(result) {
      console.log("Vehiculo Agregado");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Set onto a $scope variable the selected vehicle identifier.
   */
  $scope.setVehicle = function(alias, id, placa, marca, año, color){
    if (typeof $rootScope.chosenVehicle == "undefined"){
        $rootScope.chosenVehicle = {
          alias: alias,
          id: id,
          placa: placa,
          marca: marca,
          year: año,
          color: color
        }
      } else {
        $rootScope.chosenVehicle.alias = alias;
        $rootScope.chosenVehicle.id = id;
        $rootScope.chosenVehicle.placa = placa;
        $rootScope.chosenVehicle.marca = marca;
        $rootScope.chosenVehicle.year = año;
        $rootScope.chosenVehicle.color = color;
      }

  }


  /**
   * Load all the vehicles into $scope variable.
   */
  $scope.cargarVehiculos = function(){
    $rootScope.serviciosParaAgregar = [];
    // Hardcoded vehicle for web testing
    $scope.registrosVehiculos=[];
    var query = "SELECT vehiculo.id,vehiculo.idTipo,vehiculo.color,vehiculo.placa,vehiculo.idMarca,vehiculo.alias,vehiculo.año,vehiculo.kilometraje,vehiculo.imagen,marca.nombre as marca FROM vehiculo JOIN marca ON vehiculo.idMarca=marca.id";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosVehiculos.push({
            id: res.rows.item(i).id,
            idMarca:res.rows.item(i).idMarca,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            year: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });

        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Load all the default_services.
   */
  $scope.cargarPredeterminados = function(){
    console.log("NO ESTA DEFINIDO. LO VOY A DEFINIR");
    $rootScope.serviciosPredeterminados = [];
    var query = "SELECT * FROM servicios_predeterminados";
    console.log(query);
    $cordovaSQLite.execute(db, query).then(function(res){
      console.log(res);
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $rootScope.serviciosPredeterminados.push({
            nombre: res.rows.item(i).nombre,
            tipo_intervalo: res.rows.item(i).tipo_intervalo,
            intervalo: res.rows.item(i).intervalo
          });
        }
      //$rootScope.predeterminadosAgregados = true;
      console.log("Se agregaron los servicios predeterminados.")
      }else{
        console.log("No hay servicios predeterminados");
      }
      console.log("SE CARGARON : "+ res.rows.length + " SERVICIOS");
    }, function(error){
      console.log(error);
    });
  }

  $scope.eliminarVehiculo=function(idVehiculo){
    console.log("INTENTANDO ELIMINAR VEHICULO CON ID: "+idVehiculo);
    var query="DELETE FROM vehiculo WHERE id="+idVehiculo;
    $cordovaSQLite.execute(db,query).then(
      function(res){
        console.log("VEHICULO CON "+idVehiculo+" ELIMINADO DE LA BASE DE DATOS");
    },function(error){
      console.log("ERROR ELIMINANDO VEHICULO DE LA BASE DE DATOS");
      alert(error);
      console.log(error);

    });


  }
  
   $scope.showConfirmEliminarVehiculo2 = function(idVehiculo,alias) {
    console.log('MOSTRANDO POPUP DE CONFIRMACION DE ELIMINACION DE VEHICULO');
     var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar Vehiculo',
       template: "Seguro que quieres eliminar a "+alias
     });
     confirmPopup.then(function(res) {
       if(res) {
        //console.log("EL PADRE ES:"+padre.attr("id"));
        //console.log(angular.element($("#1")).attr("class"));
         angular.element($("#"+idVehiculo)).remove();
        //console.log(angular.element($("#1")).attr("class"));
         console.log('CONFIRMO POSITIVO');
         $scope.eliminarVehiculo(idVehiculo);

       } else {
         console.log('CONFIRMO NEGATIVO');
       }
     });
   };


   $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.imageSrc = 'https://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(index) {
      for(var l=0; l<$scope.registrosVehiculos.length; l++){
        console.log("INDEX: "+index);
        console.log("registro: "+$scope.registrosVehiculos[l].id);
        if ($scope.registrosVehiculos[l].id == index){
          $scope.imageSrc = $scope.registrosVehiculos[l].imagen;
        }

      }
          //console.log("URL: "+$scope.registrosVehiculos[0].imagen);
          //$scope.imageSrc = $scope.registrosVehiculos[0].imagen;
        
      $scope.openModal();
    }

}]);


