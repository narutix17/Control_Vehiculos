/**
 * Controlador utilizado en la modificacion de la informacion de un vehiculo.
 * Utilizado en: modificarInformacion.html
 * Version: 1.0
 * Creador: Jose Cedeno.
 */
angular.module('app.controllers')
app.controller("DBControllerModificarInfo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

  // Informacion ya existente del vehiculo
  $scope.updatedplaca = $rootScope.chosenVehicle.placa;
  $scope.updatedalias = $rootScope.chosenVehicle.alias;
  $scope.updatedmarca = $rootScope.chosenVehicle.marca;
  $scope.updatedyear = $rootScope.chosenVehicle.year;
  $scope.updatedcolor = $rootScope.chosenVehicle.color;


  // We use a loading screen to wait the selected vehicle to be loaded from the database
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.chosenVehicle.id;
  }, function(){
    console.log("LOADING")
    $scope.selectedVehicle = [];
    $rootScope.selectedVehicleServices = [];
    $scope.actualid = $rootScope.chosenVehicle.id;
    var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'";
     $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({
            idVehiculo: res.rows.item(i).id,
            idTipo: res.rows.item(i).idTipo,
            color: res.rows.item(i).color,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca,
            alias: res.rows.item(i).alias,
            year: res.rows.item(i).año,
            kilometraje: res.rows.item(i).kilometraje,
            imagen: res.rows.item(i).imagen,
          });
          var servQuery = "SELECT * FROM servicio WHERE idVehiculo = ?"
          $cordovaSQLite.execute(db, servQuery, [res.rows.item(i).id]).then(function(res){
            if (res.rows.length > 0){
              for (var j=0; j<res.rows.length; j++){
                $rootScope.selectedVehicleServices.push({
                  id: res.rows.item(j).id,
                  idTipo: res.rows.item(j).idTipo,
                  idTipoIntervalo: res.rows.item(j).idTipoIntervalo,
                  idVehiculo: res.rows.item(j).idVehiculo,
                  nombre: res.rows.item(j).nombre,
                  intervalo: res.rows.item(j).intervalo,
                  ultimoRealizado: res.rows.item(j).ultimoRealizado
                });
              }
            }
          });
        }

      }else{
        console.log("No hay Registros de Vehiculos");
      }

      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
      // When the vehicle is loaded we hide the Loading screen.
      $ionicLoading.hide();
      }, function(error){
        console.log(error);
      });
  });

  /**
   * Modificar informacion de un vehiculo.
   */
  $scope.actualizarAlias = function(id){
    console.log($scope);
    alias = document.getElementById("updatedalias").value;
    placa = document.getElementById("updatedplaca").value;
    marca = document.getElementById("updatedmarca").value;
    year = document.getElementById("updatedyear").value;
    color = document.getElementById("updatedcolor").value;
    console.log(alias);
    var query = "UPDATE vehiculo SET alias=?, placa=?, marca=?, año=?, color=? WHERE id=?";
    console.log(query);
    $cordovaSQLite.execute(db, query, [alias, placa, marca, year, color, id]).then(function(result) {
      console.log("Km Actualizado");
    }, function(error){
      console.log(error);
    });

  }

}]);
