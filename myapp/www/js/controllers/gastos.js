
/**
 * Controlador utilizado para manejar los gastos.
 * Utilizado en: gastos.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 * Editores: //
 */

angular.module('app.controllers')

.controller('gastosController', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout, $ionicPopup) {


  // Arreglos de agrupaciones de mantenimientos
  var byweek = {};
  var bymonth = {};

  function groupweek(value, index, array){
      d = new Date(value.fechaEntera);
      d = Math.floor(d.getTime()/(1000*60*60*24*7));
      byweek[d]=byweek[d]||[];
      byweek[d].push(value);
  }
  // Agrupar por mes
  function groupmonth(value, index, array){
      d = new Date(value.fechaEntera);
      d = (d.getFullYear()-1970)*12 + d.getMonth();
      bymonth[d]=bymonth[d]||[];
      bymonth[d].push(value);
  }

  // Objeto que tendra los valores del modelo del HTML
  $scope.actGastos = {};

  /**
   * Grafica una serie de tiempo poniendo los datos requeridos y filtrados en los arreglos utilizados por el <canvas>
   */
  $scope.graficar = function(){
    bymonth = {};
    byweek = {};
    var tipo = $scope.actGastos.intervalo;
    var f1 = $scope.actGastos.fechaini;
    var f2 = $scope.actGastos.fechafin;

    $scope.selectedVehicleMantenimientos = [];
    $scope.graph = {};
    $scope.graph.data = [
      []
    ];

    $scope.graph.labels = [];

    // Obtengo los mantenimientos

    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.fehcaRealiz = res.rows.item(i).fechaRealizado;
          $scope.fecha = new Date($scope.fehcaRealiz);

          $scope.selectedVehicleMantenimientos.push({
            nombre: res.rows.item(i).nombre,
            id: res.rows.item(i).id_m,
            idServicio: res.rows.item(i).idServicio,
            detalle: res.rows.item(i).detalle,
            precio: res.rows.item(i).precio,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(i).fechaRealizado.substring(0, 15),
            fechaEntera: res.rows.item(i).fechaRealizado
          });
        }
      } else {
        $scope.popUpNoMantenimientos();
      }

      // Ordeno los mantenimientos por fecha ascendentemente
      $scope.selectedVehicleMantenimientos.sort(function(a,b){
        a = new Date(a.fechaEntera);
        b = new Date(b.fechaEntera);
        return a - b;
      });

      if (tipo === "Diario"){
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            console.log("PUNTO");
            $scope.graph.data[0].push(parseInt(item.precio));
            $scope.graph.labels.push(item.fechaRealizado.substring(4, 15));
          }
        }
      } else if (tipo === "Semanal") {

        var mantenimientosFiltrados = [];
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            mantenimientosFiltrados.push(item);
          }
        }

        mantenimientosFiltrados.map(groupweek);
        for (var week in byweek){
          var group = byweek[week]
          var weektotal = 0;
          for (var i in group){
            weektotal += parseInt(group[i].precio);
          }
          $scope.graph.data[0].push(weektotal);
          $scope.graph.labels.push(week);
        }

      } else {
        var mantenimientosFiltrados = [];
        for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
          var item = $scope.selectedVehicleMantenimientos[i];
          minDate = new Date(f1);
          maxDate = new Date(f2);
          if (item.fecha >= minDate && item.fecha <= maxDate){
            mantenimientosFiltrados.push(item);
          }
        }

        mantenimientosFiltrados.map(groupmonth);
        for (var month in bymonth){
          var group = bymonth[month]
          var monthtotal = 0;
          for (var i in group){
            monthtotal += parseInt(group[i].precio);
          }
          $scope.graph.data[0].push(monthtotal);
          $scope.graph.labels.push(month);
        }
      }
    });
  }

  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });

  // Carga Inicial de los datos a los arreglos requeridos por el <canvas>

  var query = "SELECT * FROM mantenimiento JOIN servicio ON mantenimiento.idServicio = servicio.id AND servicio.idVehiculo = ?";

    console.log(query);
    $scope.selectedVehicleMantenimientos = [];
    $scope.vehicleMantenimientos = [];
    $scope.vehicleInfoMantenimientos = [];
    console.log($rootScope.chosenVehicle.id);

    $scope.graph = {};
    $scope.graph.data = [
      []
    ];

    $scope.graph.labels = [];

    $cordovaSQLite.execute(db, query, [$rootScope.chosenVehicle.id]).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.fehcaRealiz = res.rows.item(i).fechaRealizado;
          $scope.fecha = new Date($scope.fehcaRealiz);

          $scope.selectedVehicleMantenimientos.push({
            nombre: res.rows.item(i).nombre,
            id: res.rows.item(i).id_m,
            idServicio: res.rows.item(i).idServicio,
            detalle: res.rows.item(i).detalle,
            precio: res.rows.item(i).precio,
            fecha: $scope.fecha,
            fechaRealizado: res.rows.item(i).fechaRealizado.substring(0, 15),
            fechaEntera: res.rows.item(i).fechaRealizado
          });
        }
      } else {
        $scope.popUpNoMantenimientos();
      }

      $scope.selectedVehicleMantenimientos.sort(function(a,b){
        a = new Date(a.fechaEntera);
        b = new Date(b.fechaEntera);
        return a - b;
      });

      for (var i = 0; i < $scope.selectedVehicleMantenimientos.length; i++){
        var item = $scope.selectedVehicleMantenimientos[i]
        $scope.graph.data[0].push(parseInt(item.precio));
        $scope.graph.labels.push(item.fechaRealizado.substring(4, 15));
      }

      $ionicLoading.hide();
      $scope.putSize();
    });

    $scope.popUpNoMantenimientos = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Visualización de Gastos',
        template: 'El vehículo no posee mantenimientos de los cuales graficar gastos'
      });
      alertPopup.then(function(res) {
        console.log('solo por fechas');
      });
    };

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

});
