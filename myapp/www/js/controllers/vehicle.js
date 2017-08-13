/**
 * Controlador utilizado para realizar operaciones que conciernen a un vehiculo
 * Utilizado en: informaciN.html
 * Version: 1.1
 * Creador: Leonardo Kuffo
 * Editores: Jose Cedeno
 */
angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerOneVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$ionicPopup', '$state', '$cordovaImagePicker', '$cordovaCamera', '$timeout', '$cordovaLocalNotification', '$ionicPopup', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicPopup, $state, $cordovaImagePicker, $cordovaCamera, $timeout, $cordovaLocalNotification, $ionicPopup){


  $scope.updatedKm = {};



  // We use a loading screen to wait the selected vehicle to be loaded from the database, so its loaded before the view.
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  

  /**
   * Eliminar un vehiculo dada la placa
   */
  $scope.eliminarVehiculo = function(placa){
    var query = "DELETE FROM vehiculo WHERE placa = ?";
    $cordovaSQLite.execute(db, query, [placa]).then(function(result) {
      console.log("Vehiculo Eliminado");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Eliminar un servicio dado el id del servicio
   */
  $scope.eliminarServicio = function(idServicio, nombre){
    $cordovaLocalNotification.isPresent(nombre+$rootScope.chosenVehicle.placa).then(function (present) {
        if (present) {
            $cordovaLocalNotification.cancel(nombre+$rootScope.chosenVehicle.placa).then(function (result) {
                console.log('Notificacion cancelada');
            });
        } else {
            console.log('no existe notificacion para cancelar');
        }
    });
    var query = "DELETE FROM servicio WHERE id = ?";
    $cordovaSQLite.execute(db, query, [idServicio]).then(function(result) {
      for (var i = 0; i < $rootScope.selectedVehicleServices.length; i ++){
          var servicio = $rootScope.selectedVehicleServices[i];
          if (servicio.id == idServicio){
              $rootScope.selectedVehicleServices.splice(i, 1);
              break;
          }
      }
      console.log("Servicio Eliminado");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Editar la informacion de un servicio
   */
  $scope.editarServicio = function(id, nombre, servTipo, intervalo, ultimoRealizado){
      $rootScope.chosenService = [];
      $rootScope.chosenService.push({
        id: id,
        nombre: nombre,
        servTipo: servTipo,
        intervalo: intervalo,
        ultimoRealizado: ultimoRealizado
      });
  }



  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.chosenVehicle.id;
  }, function(){

    // Esto se ejecuta, cuando el parametro de id de vehiculo se carga.
    if ($scope.called == true){
      return;
    }
    $scope.called = true;
    console.log("LOADING")
    $scope.selectedVehicle = [];
    $rootScope.selectedVehicleServices = [];
    $scope.actualid = $rootScope.chosenVehicle.id;

    // Query para obtener un vehiculo
    var query = "SELECT vehiculo.id,vehiculo.idTipo,vehiculo.color,vehiculo.placa,vehiculo.idMarca,vehiculo.alias,vehiculo.año,vehiculo.kilometraje,vehiculo.imagen,marca.nombre as marca FROM vehiculo JOIN marca ON vehiculo.idMarca=marca.id WHERE vehiculo.id=? LIMIT 1";
     console.log("idVehiculo: "+$scope.actualid);
     $cordovaSQLite.execute(db, query,[$scope.actualid]).then(function(res){
      console.log("res.length: "+res.rows.length);
      console.log("res.rows.item(0): "+res.rows.item(0));
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({
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
          $rootScope.selectedVehicleServices = [];
          // Del vehiculo obtengo los servicios
          var servQuery = "SELECT * FROM servicio WHERE idVehiculo = ?"
          $cordovaSQLite.execute(db, servQuery, [res.rows.item(i).id]).then(function(res){
            console.log(res.rows.length);
            if (res.rows.length > 0){
              for (var j=0; j<res.rows.length; j++){

                // Condicion para evitar duplicados
                if (res.rows.length != $rootScope.selectedVehicleServices.length){
                  console.log($rootScope.selectedVehicleServices.length);
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
            }
            $scope.putSize();
            console.log($rootScope.selectedVehicleServices.length);
            $scope.called = false;
            $ionicLoading.hide();
          });

        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
      // When the vehicle is loaded we hide the Loading screen.
      $scope.putSize();
      }, function(error){
        console.log(error);
      });
  });

  $scope.putSize = function () {
    $rootScope.sizeGrande = localStorage.getItem("sizeGrande");
    $rootScope.sizePequeno = localStorage.getItem("sizePequeno");
    $rootScope.sizeMediano = localStorage.getItem("sizeMediano");
    console.log("$rootScope.sizeGrande: "+$rootScope.sizeGrande);
    console.log("$rootScope.sizePequeno: "+$rootScope.sizePequeno);
    console.log("$rootScope.sizeMediano: "+$rootScope.sizeMediano);
    $timeout(function(){  
      if ($rootScope.sizeGrande == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.3em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.3em");
        }
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.3em");
        } 
      } else if ($rootScope.sizeMediano == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.15em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.15em");
        }
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.15em");
        }
      } else if ($rootScope.sizePequeno == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1em");
        }
        var b=document.getElementsByTagName('button');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1em");
        }
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1em");
        }
      }
      
    }, 0);
  };


  /**
   * Actualizar el kilometraje de un vehiculo
   */
  $scope.actualizarKilometraje = function(alias){
    console.log($scope);
    console.log($scope.updatedKm.km);
    console.log(alias);
    var query = "UPDATE vehiculo SET kilometraje=? WHERE alias=?";
    console.log(query);
    $cordovaSQLite.execute(db, query, [$scope.updatedKm.km, alias]).then(function(result) {
      console.log("Km Actualizado");
    }, function(error){
      console.log(error);
    });

  }



  $scope.tomarFoto = function(){

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    navigator.camera.getPicture(options).then(function(imageData) {
      console.log("ingresoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
  };

  $scope.changePicture = function() {

    navigator.camera.getPicture(onSuccess, onFail,
      {
        sourceType : Camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        allowEdit: true,
        quality: 75,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 200,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum:false
      });
    function onSuccess(imageData) {
            //$scope.user.picture = "data:image/png;base64," + imageData;
            //$scope.$apply();
      console.log("ingresoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      $state.go('tabsController2.informaciN');
      $scope.image = document.getElementById('foto');
      //console.log("imageData: "+imageData);
      console.log("imageData: "+imageData);
      //$scope.image.src = imageData;
      document.getElementById('foto').src = imageData;
    }

    function onFail(message) {
      if (appConstants.debug) {
        alert('Failed because: ' + message);
      }
    }
  };

  $scope.puEVehiculo = function() {
    
    console.log("si entraaaaaa");
    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Vehículo',
      template: 'Está seguro que desea eliminar este vehículo?',
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
               $scope.eliminarVehiculo($rootScope.chosenVehicle.placa);
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


  $scope.popUpEliminarServicio = function(idServicio, nombre) {
    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Servicio',
      template: 'Está seguro que desea eliminar el servicio: "'+nombre+'"?',
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
               $scope.eliminarServicio(idServicio, nombre);
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

 

}]);
