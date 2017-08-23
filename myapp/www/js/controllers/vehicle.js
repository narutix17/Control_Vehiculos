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

  $scope.tada = function (){
    document.getElementById("modInfo").setAttribute("class", "button button-fab button-fab-top-right button-dark icon ion-edit animated tada");
    setTimeout(function(){
      document.getElementById("modInfo").setAttribute("class", "button button-fab button-fab-top-right button-dark icon ion-edit");
    }, 2000)
  }

  $scope.updatedKm = {};
  //$scope.updatedKm.km = parseInt($rootScope.chosenVehicle.km);
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



  // We use a loading screen to wait the selected vehicle to be loaded from the database, so its loaded before the view.
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
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
    var query = "SELECT vehiculo.id,vehiculo.idTipo,vehiculo.color,vehiculo.placa,vehiculo.idMarca,vehiculo.alias,vehiculo.año,vehiculo.kilometraje,vehiculo.imagen,marca.nombre as marca, color.nombre as color FROM vehiculo JOIN marca ON vehiculo.idMarca=marca.id JOIN color ON vehiculo.color = color.id WHERE vehiculo.id=? LIMIT 1";
     console.log("idVehiculo: "+$scope.actualid);
     $cordovaSQLite.execute(db, query,[$scope.actualid]).then(function(res){
      console.log("res.length: "+res.rows.length);
      console.log("res.rows.item(0): "+res.rows.item(0));
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          console.log("MARCAAAAAAAAAAAA: "+res.rows.item(i).marca);
          console.log("MARCAAAAAAAAAAAA: "+res.rows.item(i).idMarca);
          console.log("IMAGEEN: "+res.rows.item(i).imagen);
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
          $scope.updatedKm.km = res.rows.item(i).kilometraje,
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
            $scope.primerServicioRealizar();
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
      $('#updatedKm.km').val(parseInt($rootScope.chosenVehicle.km));
      console.log("that is right");
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
  $scope.actualizarKilometraje = function(placa){
    var query = "UPDATE vehiculo SET kilometraje=? WHERE placa=?";
    $cordovaSQLite.execute(db, query, [$scope.updatedKm.km, placa]).then(function(result) {
      alert("Se ha actualizado el Kilometraje del Vehiculo");
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

  function sumarDias(fecha, dias){
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }


  $scope.primerServicioRealizar = function(){
    var query = "SELECT * FROM servicio WHERE idVehiculo = ?";
      $scope.CurrentDate = new Date();
      $scope.selectedVehicleAlias = [];
      $scope.nom = [];
      $scope.temporalSave = [];
      $scope.vehicleInfoMantenimientos = [];
      $scope.selectedVehicleMantenimientos = [];
      $scope.selectedVehicleMantenimientosKm = [];
      $scope.selectedVehicleMantenimientosFecha = [];
      var x = 2;
      var y = -2;
      $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){ //se ejecuta el query
          if (res.rows.length > 0){
            console.log("cantidad: "+res.rows.length);
          for(var i=0; i<res.rows.length; i++){
            console.log("tipo: "+res.rows.item(i).idTipoIntervalo);
            if (res.rows.item(i).idTipoIntervalo == "Fecha"){ //condicion para verificar ue el tipo de intervalo sea por fecha
              $scope.fecha = new Date(res.rows.item(i).ultimoRealizado);
              console.log("fecha3: "+sumarDias($scope.fecha, res.rows.item(i).intervalo+1)); //se suma los dias

              if ($scope.CurrentDate < $scope.fecha){ //condicion para solo obtener los servicios de fechas proximas
                    $scope.selectedVehicleMantenimientosFecha.push({ //se coloca en el arreglo los datos a presentar en la vista(html)
                      nombre: res.rows.item(i).nombre,
                      fecha: $scope.fecha.toLocaleDateString("es-MX", options)
                    });
                    x=x+1;
                    y=y-1;
              }
            } else {
              if (res.rows.item(i).ultimoRealizado != "NaN"){
                var km = parseInt(res.rows.item(i).ultimoRealizado);
                var intervalo = res.rows.item(i).intervalo;
                var kmMantenimiento = km + intervalo;
                    var kilometraje = $scope.updatedKm.km;
                    var kmRestante = kmMantenimiento - kilometraje;
                    if (kmRestante > 0){
                      $scope.selectedVehicleMantenimientosKm.push({ //se coloca en el arreglo los datos a presentar en la vista(html)
                        nombre: res.rows.item(i).nombre,
                        falta: "Faltan " + kmRestante + " kilometros"
                      });
                      x=x+1;
                      y=y-1;

                    }
              }
            }
          }
            if ($scope.selectedVehicleMantenimientosFecha.length <= 0){
              $scope.selectedVehicleMantenimientosFecha.push({
                nombre: "No tiene mantenimientos próximos"
              });
            };
            if ($scope.selectedVehicleMantenimientosKm.length <= 0){
              $scope.selectedVehicleMantenimientosKm.push({
                nombre: "No tiene mantenimientos próximos"
              });
            }

          } else {
            $scope.selectedVehicleMantenimientosKm.push({
              nombre: "No hay servicios para presentar"
            });
            $scope.selectedVehicleMantenimientosFecha.push({
              nombre: "No hay servicios para presentar"
            });
          }
          $scope.selectedVehicleMantenimientos = $scope.selectedVehicleMantenimientosFecha;
          $scope.temporalSave = $scope.selectedVehicleMantenimientos;
          $ionicLoading.hide();
          $scope.putSize();
      });

  }




}]);
