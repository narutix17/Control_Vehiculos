angular.module('app.controllers')
/**
 * Controller for Vehicle operations
 */
.controller("DBControllerVehiculo", ['$scope', '$cordovaSQLite', '$rootScope',  '$ionicLoading','$ionicPopup',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading,$ionicPopup){

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
    $rootScope.chosenVehicle = {}
    $rootScope.chosenVehicle.alias = alias;
    $rootScope.chosenVehicle.id = id;
    $rootScope.chosenVehicle.placa = placa;
    $rootScope.chosenVehicle.marca = marca;
    $rootScope.chosenVehicle.year = año;
    $rootScope.chosenVehicle.color = color;

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
      $rootScope.predeterminadosAgregados = true;
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
    
    // query2="DELETE FROM servicio WHERE idVehiculo="+idVehiculo
    var query="select * from servicio where idVehiculo="+idVehiculo;
    alert("EL QUERY QUE ESTOY MANDANDO SELECT:"+query);
    var query1="select * from servicio where idVehiculo=?";

    $cordovaSQLite.execute(db,query1,[idVehiculo]).then(
      function(res){
        var res1=res;
        for (var i = 0; i < res1.rows.length; i++) {  
          var query2="DELETE FROM mantenimiento where idServicio="+res1.rows.item(i).id;
          $cordovaSQLite.execute(db,query2).then(
            function(res){
            console.log(res.rowsAffected+" Mantenimiento eliminado");             
            },
            function(error){
              alert(error);
              console.log(error);
            });
        }
        var query3="delete from servicio where idVehiculo="+idVehiculo;
        $cordovaSQLite.execute(db,query3).then(
          function(res){
            console.log(res.rowsAffected+"SERVICIOS ELEIMINADOS DEL VEHICULO:"+idVehiculo);
          }
          ,function(error){
            console.log(error);
          });
        var query4="DELETE FROM vehiculo WHERE id="+idVehiculo;
        $cordovaSQLite.execute(db,query4).then(
          function(res){
            console.log(res.rowsAffected+"VEHICULOS ELEIMINADOS");
          }
          ,function(error){
            console.log(error);
          });



    },function(error){
      alert(error);
      console.log(error);

    });
    


  }
  //PRIMERA FORMA PASANDO EL EVENTO PARA SACAR EL CURRENT ELEMENTO
  $scope.showConfirmEliminarVehiculo = function(idVehiculo,alias,event) {
    console.log('MOSTRANDO POPUP DE CONFIRMACION DE ELIMINACION DE VEHICULO');
    var currentElement=angular.element(event.currentTarget);
    //console.log("current target:"+angular.element(event.currentTarget).parent().parent().parent().parent().attr("id"));
     var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar Vehiculo',
       template: "Seguro que quieres eliminar a "+alias+"?"
     });
     confirmPopup.then(function(res) {
       if(res) {
        var padre=currentElement.parent().parent().parent().parent();
        //console.log("EL PADRE ES:"+padre.attr("id"));
        //console.log(angular.element($("#1")).attr("class"));
        //angular.element($("#1")).remove();
        //console.log(angular.element($("#1")).attr("class"));
         padre.remove();
         console.log('CONFIRMO POSITIVO');
         $scope.eliminarVehiculo(idVehiculo);

       } else {
         console.log('CONFIRMO NEGATIVO');
       }
     });
   };
   //AQUI ME ASEGURE DE PONER en id del elemento html el id del vehiculo por lo tanto solo paso el mismo id del vehiculo
   $scope.showConfirmEliminarVehiculo2 = function(idVehiculo,alias) {
    console.log('MOSTRANDO POPUP DE CONFIRMACION DE ELIMINACION DE VEHICULO');
     var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar Vehiculo',
       template: "Seguro que quieres eliminar a "+alias+"?"
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


}]);
