angular.module('app.controllers')
/**
 * Controller for Adding Vehicle operations
 */
.controller("DBControllerAgregarVehiculo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$ionicHistory', '$state','$cordovaLocalNotification', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $ionicHistory, $state,$cordovaLocalNotification){

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


  $("label input").on("show-invalid",function(){
    $(this).parent().toggleClass("focused");
  });

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
    var servicios = $rootScope.serviciosParaAgregar;
    var query = "INSERT INTO vehiculo (idTipo,idMarca, color, placa, alias, año, kilometraje, imagen) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.newVehicle.idTipo,$scope.newVehicle.idMarca, $scope.newVehicle.newColor, $scope.newVehicle.newPlaca, $scope.newVehicle.newAlias, $scope.newVehicle.newYear, $scope.newVehicle.newKilometraje, ""]).then(function(result) {
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
    if ($scope.lastViewTitle == "Informacion"){
      $scope.serviciosAgregar = [];
      $scope.serviciosAgregar.push({
        nombre: $scope.newService.nombre,
        tipo_intervalo: $scope.newService.servTipo,
        intervalo: $scope.newService.intervalo,
        ultimoRealizado: $scope.newService.ultimoRealizado
      })
      var services = $scope.serviciosAgregar;
      var idV = $rootScope.chosenVehicle.id;
      console.log(idV);
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
    }else{
      document.getElementById("km").innerHTML = "dias";
    } 
  }


//notifica cada desde la fecha indicada hasta la misma fecha sumando la variable dias como dias del calendario dentro del mes.
  //fecha  de tipo date
  //dias de tipo entero entre el rango 1 -31
  //idVehiculo de tipo entero corresponde al id del vehiculo que necesita mantenimiento.
  $scope.notificarDias=function (idVehiculo,fecha,dias) {
    // body...
    var fechaPost=new Date(fecha);
    fechaPost.setDate(fechaPost.getDate()+dias-1);
    console.log("se va a setear notificacion");
    $cordovaLocalNotification.add({
      id: idVehiculo,
      title: 'Se acercan mantenientos a realizar',
      text: 'Revisa tu vehiculo con id'+idVehiculo,
      data: { mydata: 'data' },
      at: fechaPost

    }).then(function() {
      // body...
      console.log("la notificacion ha sido seteada");
    });

  }


//Notifica cada mes estableciendo el id del vehiculo, la fecha del ultimo realizado y la frecuencia en mes.


  $scope.notificarMes=function (idVehiculo,fecha,meses) {
    // body...
    var fechaPost=new Date(fecha);
    fechaPost.setMonth(fechaPost.getMonth()+meses);
    fechaPost.setDate(fechaPost.getDate()-7);
    console.log("se va a setear notificacion");
    $cordovaLocalNotification.add({
      id: idVehiculo,
      title: 'Se acercan mantenientos a realizar',
      text: 'Revisa tu vehiculo con id'+idVehiculo,
      data: { mydata: 'data' },
      at: fechaPost
    }).then(function() {
      // body...
      console.log("la notificacion ha sido seteada");
    });

  }

  $scope.notificarAnio=function (idVehiculo,fecha,anios) {
    // body...
    var fechaPost=new Date(fecha);
    fechaPost.setYear(fechaPost.getYear()+anios);
    if (fechaPost.getMonth()!=0) 
    {
          fechaPost.setMonth(fechaPost.getMonth()-1);

    }
    else{
          fechaPost.setMonth(11);
    }
    console.log("se va a setear notificacion");
    $cordovaLocalNotification.add({
      id: idVehiculo,
      title: 'Se acercan mantenientos a realizar',
      text: 'Revisa tu vehiculo con id'+idVehiculo,
      data: { mydata: 'data' },
      at: fechaPost
    }).then(function() {
      // body...
      console.log("la notificacion ha sido seteada");
    });

  }

}]);
