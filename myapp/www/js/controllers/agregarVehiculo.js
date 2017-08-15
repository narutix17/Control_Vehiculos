/**
 * Controlador utilizado para realizar operaciones que conciernen a agregar un vehiculo
 * o agregar servicios al mismo.
 * Utilizado en: agregarVehiculo.html, agregarServicioPersonalizado.html
 */
angular.module('app.controllers')
/**
 * Controlador para agregar vehiculos con sus respectivos servicios
 * tambien se encuentran funciones para tomar foto desde camara o desde la galeria
 */

.controller("DBControllerAgregarVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$ionicHistory', '$state', '$cordovaCamera', '$cordovaFile', '$timeout', '$cordovaLocalNotification', '$ionicPopup', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicHistory, $state, $cordovaCamera, $cordovaFile, $timeout, $cordovaLocalNotification, $ionicPopup){

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

  $scope.$on('$ionicView.afterEnter', function(){
    $scope.putSize();
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
    
    var x = 0;

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
                  if (servicios[x].tipo_intervalo == "Fecha"){
                    $scope.notificacion($scope.newVehicle.newPlaca, $scope.newVehicle.newAlias, $scope.newVehicle.idMarca, idVehiculo, serv.ultimoRealizado, serv.nombre, serv.intervalo);
                  }
                  x = x+1;   
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
      $scope.putSize();
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

                  $scope.notificacion($rootScope.chosenVehicle.placa, $rootScope.chosenVehicle.alias, $rootScope.chosenVehicle.marca, $rootScope.chosenVehicle.id, $scope.newService.ultimoRealizado, $scope.newService.nombre, $scope.newService.intervalo);

                  $state.go('tabsController2.informaciN');
        });
      //}
    }else{
      $state.go('tabsController.agregarVehiculo');
    }
    $scope.putSize();
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
  //$scope.putSize();


  // funcion para modificar el html segun la opcion escogida en el select con id "ciclo"
  $scope.onChanged = function(){
    var ciclo = $("#ciclo").val();
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
      //document.getElementById("input_id").attributes["type"].value = "text";
    } 
  }

  //funcion para escoger una imagen desde la galeria
  $scope.fotoGaleria = function() {
    $scope.images = [];
    navigator.camera.getPicture(onSuccess, onFail,
      {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY, //escoger desde galeria
        correctOrientation: true,
        allowEdit: true, //para poder editar
        quality: 75, //calidad
        popoverOptions: CameraPopoverOptions,
        targetWidth: 200,
        destinationType: navigator.camera.DestinationType.FILE_URI, //para devolver el URI donde se guardo temporalmente la imagen
        encodingType: Camera.EncodingType.PNG, //salida en archivo png
        saveToPhotoAlbum:false
      });
    function onSuccess(sourcePath) {
      $scope.image = document.getElementById('foto');
      document.getElementById('foto').src = sourcePath; //colocamos la imagen en el tag <img> del html
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
      console.log("Copying from : " + sourceDirectory + sourceFileName);
      console.log("Copying to : " + cordova.file.dataDirectory + sourceFileName);
      window.resolveLocalFileSystemURL(sourcePath, copyFile, fail);

      function copyFile(fileEntry) { //funcion para copiar la foto a otra direccion y poder seguir usandola
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
        $scope.img = entry.nativeURL; //guarda la nueva URL en un objeto para colocarlo en la base de datos
      }
   
      function fail(error) {
        console.log("fail: " + error.code);
      }
   
      function makeid() { //se hace un id y nombre aleatorio para la imagen 
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
  //funcion para tomar la foto desde la camara con un funcionamiento similar al de galeria
  $scope.tomarFoto = function() {
    $scope.images = [];
    navigator.camera.getPicture(onSuccess, onFail,
      {
        sourceType : Camera.PictureSourceType.CAMERA, //foto desde camara 
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
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.3em");
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
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.15em");
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
        var h=document.getElementsByTagName('h5');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1em");
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

  //funcion para restar dias a una fecha
  function restarDias(fecha, dias){
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

////  NOTIFICACIONES   
///////////////////////////////////////////////////////////////////////////////////////////////
  //notificaciones creadas al registrar un nuevo servicio 
  $scope.notificacion = function(placa, alias, marca, idVehiculo, ultimoFechaServicio, nombreServicio, intervaloServicio){
    $scope.informacion = [];
    $scope.informacion.push({
      nombre: $scope.newService.nombre,
      tipo_intervalo: $scope.newService.servTipo,
      intervalo: $scope.newService.intervalo,
      ultimoRealizado: $scope.newService.ultimoRealizado
    });
    $scope.fecha = new Date(ultimoFechaServicio.replace(/-/g, '\/'));
    var diaNotificacion = $scope.fecha;
    sumarDias(diaNotificacion, intervaloServicio)
    restarDias(diaNotificacion, 1);
    var hora = Math.floor(Math.random() * (20 - 8)) + 8;
    diaNotificacion.setHours(hora);
    var now = new Date().getTime();
    var _5_SecondsFromNow = new Date(now + 15 * 1000);
    $cordovaLocalNotification.schedule({
      id: nombreServicio+placa,
      date: _5_SecondsFromNow,
      //date: dianotificacion,
      message: "Toque para ingresar a los servicios por realizar",
      title: "Servicio a Realizar Mañana",
      sound: null
    }).then(function () {
      alert("Notification Set");
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function(state) {
      $state.go('tabsController.proximosMantenimientos');
      $scope.servicioPopUp(nombreServicio, alias, placa, marca, idVehiculo);
      console.log("si pasaaaaaaaa");
      
    }, this);

    cordova.plugins.notification.local.on("trigger", function () {
        // After 10 minutes update notification's title 
        //alert("trigeriada");
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: nombreServicio+placa,
                title: "Servicio a Realizar Hoy"
            });
        }, 60000);
    });
  }

  $scope.servicioPopUp = function(servicio, alias, placa, marca, id) {
    
    var alertasPopup = $ionicPopup.confirm({
      title: 'Servicio a Realizar',
      template: 'Tiene que realizar el siguiente servicio: "'+servicio+'", del vehiculo:<br>Alias: '+alias+'<br>Placa: '+placa+'<br>Marca: '+marca,
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
              //angular.element($("#"+idVehiculo)).remove();
              //$scope.eliminarVehiculo(idVehiculo);
              
            }
         },
         {
          text: 'Posponer',
          onTap: function(e){
            $scope.posponer(servicio, id);    
          }
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contrasena');
    });
  };

  $scope.posponer = function(nombre, id) {
    $rootScope.newItem = {};
    var alertasPopup = $ionicPopup.show({
      title: 'Posponer Servicio',
      template: '<p>Ingrese la cantidad de dias que desea posponer el servicio: </p><br><input type="number" ng-model="newItem.aumentarDias">',
      rootScope: this,
      buttons: [
         {
            text: 'Aceptar',
            type: 'button-positive',
            onTap: function(e){
              //angular.element($("#"+idVehiculo)).remove();
              //$scope.eliminarVehiculo(idVehiculo);
              console.log("diaaaaaaaas: "+$scope.newItem.aumentarDias);
              //return $scope.diasPosponer.aumentarDias;
              $scope.actualizarDiasPosponer(nombre, id, $scope.newItem.aumentarDias);
              $state.go('tabsController.proximosMantenimientos');
            }
         },
         {
          text: 'Cancelar'
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  $scope.actualizarDiasPosponer = function(nombre, id, intervaloAct){
    var query = "SELECT intervalo FROM servicio WHERE idVehiculo=? and nombre=?";
    $cordovaSQLite.execute(db, query, [id, nombre]).then(function(res){
      var intervalo = res.rows.item(0).intervalo;
      var nuevoIntervalo = intervalo + intervaloAct;
      var idInt = parseInt(id);

      var query2 = "UPDATE servicio SET intervalo=? WHERE idVehiculo=? and nombre=?";
      $cordovaSQLite.execute(db, query2, [ nuevoIntervalo, idInt, nombre]).then(function(res2){
        console.log("Actualizado el intervalo con exito");
      });
    });
  }

  $scope.cancelNotification = function (id) {
    $cordovaLocalNotification.isPresent(id).then(function (present) {
        if (present) {
            $cordovaLocalNotification.cancel(id).then(function (result) {
                console.log('Notificacion cancelada');
            });
        } else {
            console.log('no existe notificacion para cancelar');
        }
    });

  };

}]);
