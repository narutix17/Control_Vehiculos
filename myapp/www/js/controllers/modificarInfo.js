
/**
 * Controlador utilizado en la modificacion de la informacion de un vehiculo.
 * Utilizado en: modificarInformacion.html
 * Version: 1.0
 * Creador: Jose Cedeno.
 */
angular.module('app.controllers')
app.controller("DBControllerModificarInfo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', '$state', '$ionicPopup', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout, $state, $ionicPopup){

  $scope.updatedVehicle = {};
  // verificacion de placa
  $('body').on('focusout', '#updatedplaca', function(){
    var valorPlaca = $scope.updatedVehicle.updatedplaca;
    console.log("en la placaaaa: "+valorPlaca);

    //var digitos = valorPlaca.length;

    // Aqui esta el patron(expresion regular) a buscar en el input
    patronPlaca = /([A-Za-z]{3}-\d{3,4})/;

    if( patronPlaca.test($scope.updatedVehicle.updatedplaca) )
    {
      console.log('Yeah!! si es correcto');
      $('#mensaje').text('');
      $('#mensaje').css('display', 'none');
    }
    else
    {
      $('#mensaje').text('Formato de Placa no valida. ');
      $('#mensaje').css('display', 'inline');
    }
    $scope.verificarPlacas(valorPlaca);
  })

  $scope.verificarPlacas = function(placa){
    var indicador = 0;
    var query = "select * from vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      for(var i=0;i<res.rows.length; i++){
        console.log("placas");
        console.log(res.rows.item(i).placa.toLowerCase());
        console.log(placa.toLowerCase());
        if(res.rows.item(i).placa.toLowerCase() == placa.toLowerCase()){
          indicador +=1;
        }
      }
      if (indicador > 1){
        console.log("entro aca");
        $scope.popUpPlacaRepetida();
        $scope.updatedVehicle.updatedplaca = "";
      }
    })
  }

  $scope.popUpPlacaRepetida = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Placa Existente',
      template: 'La placa ingresada ya existe, por favor ingrese una nueva placa'
    });
    alertPopup.then(function(res) {
      console.log('placa repetida');
    });
  };

  $scope.newVehicle = {}
  // Informacion ya existente del vehiculo
  //$scope.updatedplaca = $rootScope.chosenVehicle.placa;
  //$scope.updatedalias = $rootScope.chosenVehicle.alias;
  //$scope.updatedmarca = $rootScope.chosenVehicle.marca;
  //$scope.updatedyear = $rootScope.chosenVehicle.year;
  //$scope.updatedcolor = $rootScope.chosenVehicle.color;


  // We use a loading screen to wait the selected vehicle to be loaded from the database
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.cargarInformacion = function(){
    console.log("entraaaaaa");
    $scope.actualid = $rootScope.chosenVehicle.id;
    var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'";
    $cordovaSQLite.execute(db, query).then(function(res){
      console.log("PRIMERPPPPPP: "+res.rows.item(0).placa);
      console.log(res.rows.item(0).alias);
      console.log(res.rows.item(0).año);
      $scope.updatedplaca = res.rows.item(0).placa;
      $scope.updatedalias = res.rows.item(0).alias;
      $scope.updatedyear = res.rows.item(0).año;
    })
  }

  /**
   * We use a listener to wait the selected vehicle to be retrieved from the database.
   */
  $scope.$watch(function(){
    return $rootScope.chosenVehicle.id;
  }, function(){
    console.log("LOADING")
    $scope.selectedVehicle = []; //arreglo para los datos del vehiculo
    $rootScope.selectedVehicleServices = []; //arreglo para los datos del servicio del vehiculo
    $scope.actualid = $rootScope.chosenVehicle.id;
    var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'"; //query para obtener los datos de un vehiculo especifico por id
     $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.selectedVehicle.push({ // se guardan los datos del vehiculo en el arreglo selectedVehicle
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

          var servQuery = "SELECT * FROM servicio WHERE idVehiculo = ?" //query para obtener los servicios del vehiculos seleccionado por id
          $cordovaSQLite.execute(db, servQuery, [res.rows.item(i).id]).then(function(res){
            if (res.rows.length > 0){
              for (var j=0; j<res.rows.length; j++){
                $rootScope.selectedVehicleServices.push({ //se guarda los datos de servicios en el arreglo selectedVehicleServices
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

        $scope.img = $scope.selectedVehicle[0].imagen; //guardo la imagen actual del vehiculo en un scope para que no haya problema si el usuario no actualiza la imagen

      }else{
        console.log("No hay Registros de Vehiculos");
      }
      $scope.cargarInformacion();
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
      // When the vehicle is loaded we hide the Loading screen.

      $ionicLoading.hide();
      $scope.putSize();
      }, function(error){
        console.log(error);
      });
  });



  //CARGA MARCAS DE TODOS LOS VEHICULOS
  $scope.cargarMarcas = function(){
    //$rootScope.serviciosParaAgregar = [];
    // Hardcoded vehicle for web testing
    $scope.registrosPlacasVehiculos=[];
    var query = "select * from marca";
    $cordovaSQLite.execute(db, query).then(function(res){

      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosPlacasVehiculos.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre
          });

        }

      }else{
        console.log("No hay Registros de Marcas");
      }
      console.log("SE CARGARON : "+ res.rows.length + " Marcas");
    }, function(error){
      console.log(error);
    });
  }

  //CARGA COLORES DE TODOS LOS VEHICULOS
  $scope.cargarColores = function(){
    //$rootScope.serviciosParaAgregar = [];
    // Hardcoded vehicle for web testing
    $scope.registrosColoresVehiculos=[];
    var query = "select * from color";
    $cordovaSQLite.execute(db, query).then(function(res){
      console.log("TAMAAAAAAAAAAAANOOOOOOOOOOOO: "+res.rows.length);
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          console.log(res.rows.item(i).nombre);
          $scope.registrosColoresVehiculos.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre
          });

        }

      }else{
        console.log("No hay Registros de Colores");
      }
      console.log("SE CARGARON : "+ res.rows.length + " Colores");
    }, function(error){
      console.log(error);
    });
  }

  $scope.cargarColores();
  $scope.cargarMarcas();

  /**
   * Modificar informacion de un vehiculo.
   */
  $scope.actualizarAlias = function(id){
    console.log($scope);
    $scope.actualid = $rootScope.chosenVehicle.id;
    var query = "SELECT * FROM vehiculo WHERE id = '"+ $scope.actualid +"'";
    $cordovaSQLite.execute(db, query).then(function(res){
      alias = document.getElementById("updatedalias").value;
      placa = document.getElementById("updatedplaca").value;
      //marca = document.getElementById("updatedmarca").value;
      year = document.getElementById("updatedyear").value;
      //color = document.getElementById("updatedcolor").value;
      console.log(alias);
      console.log("Marcaaa: "+$scope.newVehicle.idMarca);
      console.log("Colorrr: "+$scope.newVehicle.newColor);
      if (typeof($scope.newVehicle.idMarca) == "undefined"){
        console.log("entra1")
        $scope.newVehicle.idMarca = res.rows.item(0).idMarca;
      }
      if (typeof($scope.newVehicle.newColor) == "undefined"){
        console.log("entra2")
        $scope.newVehicle.newColor = res.rows.item(0).color;
      }
      console.log("Marcaaa: "+$scope.newVehicle.idMarca);
      console.log("Colorrr: "+$scope.newVehicle.newColor);
      console.log("imagen: "+$scope.img);
      var query = "UPDATE vehiculo SET alias=?, placa=?, idMarca=?, año=?, color=?, imagen=? WHERE id=?";
      console.log(query);
      $cordovaSQLite.execute(db, query, [alias, placa, $scope.newVehicle.idMarca, year, $scope.newVehicle.newColor, $scope.img, id]).then(function(result) {
        console.log("Km Actualizado");
        $state.go('tabsController2.informaciN');
      }, function(error){
        console.log(error);
      });
    })
  }

  $scope.fotoGaleria = function() {
    $scope.images = [];
    navigator.camera.getPicture(onSuccess, onFail,
      {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
        allowEdit: true,
        quality: 75,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 200,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum:false
      });
    function onSuccess(sourcePath) {
      $scope.image = document.getElementById('fotos');
      console.log("IAMGEEENN: "+$scope.image);
      document.getElementById('fotos').src = sourcePath;
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
      console.log("Copying from : " + sourceDirectory + sourceFileName);
      console.log("Copying to : " + cordova.file.dataDirectory + sourceFileName);
      console.log("IAMGEEENN: "+$scope.image);
      console.log("IAMGEEENN: "+document.getElementById('fotos'));
      window.resolveLocalFileSystemURL(sourcePath, copyFile, fail);

      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
          fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail
          );
        },
        fail);
      }
      function onCopySuccess(entry) {
        $scope.$apply(function () {
          $scope.images.push(entry.nativeURL);
        });
        console.log("URL: "+entry.nativeURL);
        $scope.img = entry.nativeURL;
      }

      function fail(error) {
        console.log("fail: " + error.code);
      }

      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }
    }

    function onFail(message) {
      if (appConstants.debug) {
        alert('Failed because: ' + message);
      }
    }
  }

  $scope.tomarFoto = function() {
    $scope.images = [];
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
    function onSuccess(sourcePath) {
      $scope.image = document.getElementById('fotos');
      document.getElementById('fotos').src = sourcePath;
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
      console.log("Copying from : " + sourceDirectory + sourceFileName);
      console.log("Copying to : " + cordova.file.dataDirectory + sourceFileName);
      window.resolveLocalFileSystemURL(sourcePath, copyFile, fail);

      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
          fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail
          );
        },
        fail);
      }
      function onCopySuccess(entry) {
        $scope.$apply(function () {
          $scope.images.push(entry.nativeURL);
        });
        $scope.img = entry.nativeURL;
      }

      function fail(error) {
        console.log("fail: " + error.code);
      }

      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }
    }

    function onFail(message) {
      if (appConstants.debug) {
        alert('Failed because: ' + message);
      }
    }
  }

  //funcion para cambiar el tamaño de letra de la aplicacion
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
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1.3em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1.3em");
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
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1.1em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1.1em");
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
        var a=document.getElementsByTagName('span');
        for(var b=0;b<a.length;b++){
          a[b].setAttribute("style","font-size: 1em");
        }
        var c=document.getElementsByTagName('input');
        for(var d=0;d<c.length;d++){
          c[d].setAttribute("style","font-size: 1em");
        }
      }

    }, 0);
  };

}]);
