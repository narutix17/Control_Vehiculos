/**
 * Controlador utilizado para realizar operaciones que conciernen a agregar un vehiculo
 * o agregar servicios al mismo.
 * Utilizado en: agregarVehiculo.html, agregarServicioPersonalizado.html
 */
angular.module('app.controllers')
/**
 * Controller for Adding Vehicle operations
 */
.controller("DBControllerAgregarVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$ionicHistory', '$state', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicHistory, $state, $cordovaCamera, $cordovaFile){

  $scope.newService = {}
  $scope.newVehicle = {}
  $scope.img = "img/car_agregar.png";
  /**
   * Scope methods excecuted before entering the view that implements the controller
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log("INGRESANDO A LA VISTA DE AGREGAR VEHICULO");
    console.log($rootScope.predeterminadosAgregados);
    if ($rootScope.predeterminadosAgregados == false || typeof $rootScope.predeterminadosAgregados == "undefined"){
        $scope.agregarServiciosPredeterminadosALaLista();
        $rootScope.predeterminadosAgregados = true;
    }
  });


  //$("label input").on("show-invalid",function(){
    //$(this).parent().toggleClass("focused");
  //});

  $scope.editarServicio = function(nombre){
      $rootScope.chosenService = [];
      for (var i =0; i <  $rootScope.serviciosParaAgregar.length; i++){
          if ( $rootScope.serviciosParaAgregar[i].nombre == nombre){
            $rootScope.chosenService.push({
              nombre: nombre,
              servTipo: $rootScope.serviciosParaAgregar[i].servTipo,
              intervalo: $rootScope.serviciosParaAgregar[i].intervalo,
              ultimoRealizado: $rootScope.serviciosParaAgregar[i].ultimoRealizado
            });
          }
      }
  }

  /**
   * Create Vehicle method. Recieve the form model located in "agregarVehiculo.html"
   */
  $scope.crearVehiculo = function(){
    console.log("nativeURL: "+$scope.img);
    var servicios = $rootScope.serviciosParaAgregar;
    var query = "INSERT INTO vehiculo (idTipo,idMarca, color, placa, alias, año, kilometraje, imagen) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.newVehicle.idTipo,$scope.newVehicle.idMarca, $scope.newVehicle.newColor, $scope.newVehicle.newPlaca, $scope.newVehicle.newAlias, $scope.newVehicle.newYear, $scope.newVehicle.newKilometraje, $scope.img]).then(function(result) {
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
      console.log("ERROR INSERTANDO UN NUEVO VEHICULO")
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
    $rootScope.predeterminadosAgregados = true;
    $rootScope.serviciosParaAgregar.push({
        nombre: $scope.newService.nombre,
        tipo_intervalo: $scope.newService.servTipo,
        intervalo: $scope.newService.intervalo,
        ultimoRealizado: $scope.newService.ultimoRealizado
    })
    $ionicLoading.hide();

    $scope.lastViewTitle = $ionicHistory.backTitle();
    console.log("ACAAAAAAAAAAAAAA: " + $scope.lastViewTitle)
    console.log("ACAAAAAAAAAAAAAA: " + $scope.newService.ultimoRealizado.toString().substring(0, 15))
    
    if ($scope.lastViewTitle == "Informacion"){
      $scope.serviciosAgregar = [];
      $scope.serviciosAgregar.push({
        nombre: $scope.newService.nombre,
        tipo_intervalo: $scope.newService.servTipo,
        intervalo: $scope.newService.intervalo,
        ultimoRealizado: $scope.newService.ultimoRealizado.toString().substring(0, 15)
      })
      var services = $scope.serviciosAgregar;
      var idV = $rootScope.chosenVehicle.id;
      console.log(idV);
      console.log("fechaaaa: "+$scope.newService.ultimoRealizado.toString().substring(0, 15));
      //for (i = 0; i < services.length; i++){
        var servi = services[0];
        var servQuery = "INSERT INTO servicio (idTipo, idTipoIntervalo, idVehiculo, nombre, intervalo, ultimoRealizado) VALUES (?, ?, ?, ?, ?, ?);"
        $cordovaSQLite.execute(db, servQuery, [2, servi.tipo_intervalo, idV, servi.nombre, servi.intervalo, servi.ultimoRealizado ]).then(function(result) {
                  console.log("Servicio Agregado"+ servi.nombre);
                  $state.go('tabsController2.informaciN');
        });
      //}
    }else{
      $state.go('tabsController.agregarVehiculo');
    }
  }


  //CARGA PLACAS DE TODOS LOS VEHICULOS
  $scope.cargarPlacas = function(){
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

  //CARGA LOS TIPOS DE VEHICULOS QUE EXISTEN EN LA TABLA tipo_vehiculo
  $scope.cargarTiposVehiculos = function(){
    //$rootScope.serviciosParaAgregar = [];
    // Hardcoded vehicle for web testing
    $scope.registrosTiposVehiculos=[];
    var query = "select * from tipo_vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.registrosTiposVehiculos.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre
          });

        }
      }else{
        console.log("No hay Registros de Tipos de Vehiculos");
      }
      console.log("SE CARGARON : "+ res.rows.length + " TIPOS DE VEHICULOS");
    }, function(error){
      console.log("PROBLEMA AL CARGAR TIPOS DE VEHICULOS");
      console.log(error);
    });
  }

  $scope.cargarPlacas();
  $scope.cargarTiposVehiculos();



  $scope.onChanged = function(){
    var ciclo = $("#ciclo").val();
    console.log("ACAAAAAA:" + ciclo);
    if (ciclo == "Kilometraje"){
      document.getElementById("km").innerHTML = "kilometros";
      document.getElementById("kof").innerHTML = "Kilometraje de ultimo servicio:"; 
      var km = document.getElementById("kilfec");
      km.type = "number"; 
    }else{
      document.getElementById("km").innerHTML = "dias";
      document.getElementById("kof").innerHTML = "Fecha de ultimo servicio:";
      var date = document.getElementById("kilfec");
      date.type = "date"; 
    } 
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
      $scope.image = document.getElementById('foto');
      document.getElementById('foto').src = sourcePath;
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
      $scope.image = document.getElementById('foto');
      document.getElementById('foto').src = sourcePath;
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

}]);
