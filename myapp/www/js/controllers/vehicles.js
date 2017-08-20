/**
 * Controlador para la lista de vehiculos.
 * Utilizado en: listaDeVehiculos.html
 * Version: 1.3
 * Creador: Leonardo Kuffo
 * Editores: Jose Cedeno, Ruben Suarez
 */

angular.module('app.controllers')

.controller("DBControllerVehiculo", ['$scope', '$cordovaSQLite', '$rootScope',  '$ionicLoading', '$ionicPopup', '$ionicModal', '$timeout', '$state',  function($scope, $cordovaSQLite, $rootScope, $ionicLoading,$ionicPopup, $ionicModal, $timeout, $state){

  $rootScope.serviciosParaAgregar = [];
  $rootScope.predeterminadosAgregados = false;
  $rootScope.sizeGrande = localStorage.getItem("sizeGrande");
  $rootScope.sizePequeno = localStorage.getItem("sizePequeno");
  $rootScope.sizeMediano = localStorage.getItem("sizeMediano");

  $scope.prueba = [5,10,15,20];
  localStorage.setItem("tiempos", $scope.prueba);


  /**
   * Scope methods excecuted before entering the view that implements the controller
   */
  $scope.$on('$ionicView.beforeEnter', function () {
    $rootScope.predeterminadosAgregados = false;
    $scope.cargarVehiculos();
    $scope.cargarPredeterminados();
    console.log("sizeGrande: "+$rootScope.size12);
  });


  $scope.tamano = function(opcion){
    $scope.opcion = opcion;
    console.log("opcion: "+$scope.opcion);
    //var tamano = $("#tamano").val();
  };





  $scope.tamano = function(opcion){
    $scope.opcion = opcion;
    console.log("opcion: "+$scope.opcion);
    //var tamano = $("#tamano").val();
  };




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

  $scope.setVehicle = function(alias, id, placa, marca, año, color, km){

    if (typeof $rootScope.chosenVehicle == "undefined"){

        $rootScope.chosenVehicle = {
          alias: alias,
          id: id,
          placa: placa,
          marca: marca,
          year: año,

          color: color,
          km: km

        }
      } else {
        $rootScope.chosenVehicle.alias = alias;
        $rootScope.chosenVehicle.id = id;
        $rootScope.chosenVehicle.placa = placa;
        $rootScope.chosenVehicle.marca = marca;
        $rootScope.chosenVehicle.year = año;
        $rootScope.chosenVehicle.color = color;

        $rootScope.chosenVehicle.km = km;

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
          if (localStorage.getItem("Alias") == "true"){
            $scope.registrosVehiculos.push({
              id: res.rows.item(i).id,
              orden1: res.rows.item(i).alias,
              orden2: "Placa: "+res.rows.item(i).placa,
              orden3: "Marca: "+res.rows.item(i).marca,
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
          } else if (localStorage.getItem("Placa") == "true"){
            $scope.registrosVehiculos.push({
              id: res.rows.item(i).id,
              orden1: res.rows.item(i).placa,
              orden2: "Alias: "+res.rows.item(i).alias,
              orden3: "Marca: "+res.rows.item(i).marca,
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
          } else if (localStorage.getItem("Marca") == "true"){
            $scope.registrosVehiculos.push({
              id: res.rows.item(i).id,
              orden1: res.rows.item(i).marca,
              orden2: "Alias: "+res.rows.item(i).alias,
              orden3: "Placa: "+res.rows.item(i).placa,
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
          } else {
            $scope.registrosVehiculos.push({
              id: res.rows.item(i).id,
              orden1: res.rows.item(i).alias,
              orden2: "Placa: "+res.rows.item(i).placa,
              orden3: "Marca: "+res.rows.item(i).marca,
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
        }
      }else{
        console.log("No hay Registros de Vehiculos");
      }
      $scope.putSize();
      console.log("SE CARGARON : "+ res.rows.length + " VEHICULOS");
    }, function(error){
      console.log(error);
    });
  }

  /**
   * Load all the default_services from the db.
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

  /**
   * Eliminar un vehiculo desde la lista de vehiculos
   */
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

  /**
   * Mensaje de confirmacion al eliminar un vehiculo de la lista de vehiculos
   */


   $scope.showConfirmEliminarVehiculo2 = function(idVehiculo,alias) {

    var alertasPopup = $ionicPopup.confirm({
      title: 'Eliminar Vehículo',
      template: 'Está seguro que desea eliminar el vehículo ' + alias,
      buttons: [
         {
            text: 'Ok',
            type: 'button-positive',
            onTap: function(e){
              angular.element($("#"+idVehiculo)).remove();
              $scope.eliminarVehiculo(idVehiculo);

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

  $scope.choice = {
    value: '2'
  };

  $scope.choice2 = {
    value: '5'
  };


  //funcion para configurar la visualizacion
  $scope.configurarVista = function() {


    var alertasPopup = $ionicPopup.confirm({
      title: 'Configuración',
      templateUrl: 'orderPopup.html',
      scope: $scope,
      buttons: [
         {
            text: 'Ok',
            type: 'button-positive',
            onTap: function(e){
              console.log("primera opcion: "+$scope.choice2.value.toString());
              console.log("segunda opcion: "+$scope.choice.value.toString());
              $scope.tamanoChanged($scope.choice.value.toString());
              $scope.criterio($scope.choice2.value.toString());
              $state.go('tabsController.listaDeVehiculos');
            }
         },
         {
          text: 'Volver'
         }
      ]
    });
    alertasPopup.then(function(res) {
      console.log('popup contraseña');
    });
  };

  //funcion para definir el tamaño de letra de la aplicacion
  $scope.tamanoChanged = function(tamano){
    $timeout(function(){
      if (tamano == "Grande"){
        //console.log("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        localStorage.setItem("sizeGrande",true);
        localStorage.setItem("sizeMediano",false);
        localStorage.setItem("sizePequeno",false);
        //console.log("guardado: "+localStorage.getItem("size12"));
        $rootScope.sizePequeño = true;
        $rootScope.sizetemp = true;
        var s=document.getElementsByTagName('p');
        for(i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.3em");
        }
        var b=document.getElementsByTagName('h2');
        for(j=0;j<b.length;j++)
        {
            b[j].setAttribute("style","font-size: 1.35em");

        }


      } else if (tamano == "Mediano"){
        localStorage.setItem("sizePequeno",false);
        localStorage.setItem("sizeMediano",true);
        localStorage.setItem("sizeGrande",false);
        var s=document.getElementsByTagName('p');
        for(i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.15em");
        }
        var b=document.getElementsByTagName('h2');
        for(j=0;j<b.length;j++)
        {
            b[j].setAttribute("style","font-size: 1.2em");

        }

      } else if (tamano == "Pequeno"){
        localStorage.setItem("sizePequeno",true);
        localStorage.setItem("sizeMediano",false);
        localStorage.setItem("sizeGrande",false);
        var s=document.getElementsByTagName('p');
        for(i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1em");
        }
        var b=document.getElementsByTagName('h2');
        for(j=0;j<b.length;j++)
        {
            b[j].setAttribute("style","font-size: 1.05em");

        }

      }
    }, 0);
  };


  //funcion para colocar el tamaño de las letras

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
        var b=document.getElementsByTagName('h2');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.35em");
        }
      } else if ($rootScope.sizeMediano == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1.15em");
        }
        var b=document.getElementsByTagName('h2');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.2em");
        }
      } else if ($rootScope.sizePequeno == "true"){
        var s=document.getElementsByTagName('p');
        for(var i=0;i<s.length;i++){
          s[i].setAttribute("style","font-size: 1em");
        }
        var b=document.getElementsByTagName('h2');
        for(var j=0;j<b.length;j++){
          b[j].setAttribute("style","font-size: 1.05em");
        }
      }
    }, 0);
  };

  //funcion para guardar los datos de configuracion de vista
  $scope.criterio = function(criterio){
    if (criterio == "Alias"){
      localStorage.setItem("Alias",true);
      localStorage.setItem("Placa",false);
      localStorage.setItem("Marca",false);
    } else if(criterio == "Placa"){
      localStorage.setItem("Alias",false);
      localStorage.setItem("Placa",true);
      localStorage.setItem("Marca",false);
    } else if(criterio == "Marca"){
      localStorage.setItem("Alias",false);
      localStorage.setItem("Placa",false);
      localStorage.setItem("Marca",true);
    }
  };

  //funcion para agrandar la imagen del vehiculo
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
      $scope.openModal();
    }

}]);
