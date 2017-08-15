/**
 * Controlador utilizado para editar servicios de un vehiculo nuevo.
 * Utilizado en: editarServicioNuevo.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')

app.controller("DBEditarServicioNuevo", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout){

    $scope.servicioEditado = {};

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.$watch(function(){
      return $rootScope.chosenService[0].nombre;
    }, function(){
      $ionicLoading.hide();
      $scope.putSize();
    });

    // Funcion para editar los servicios de un nuevo vehiculo aun no agregado a la base
    $scope.editarServicioParaAgregar = function(){
      console.log("Editando servicio");
      for (var i = 0; i < $rootScope.serviciosParaAgregar.length ; i++){
        console.log($rootScope.serviciosParaAgregar[i].nombre);
        console.log($rootScope.chosenService[0].nombre);
        if ($rootScope.serviciosParaAgregar[i].nombre == $rootScope.chosenService[0].nombre){
            console.log("EDITANDOOOOOOOOOOOOO");
            $rootScope.serviciosParaAgregar[i].tipo_intervalo = $scope.servicioEditado.tipo_intervalo;
            $rootScope.serviciosParaAgregar[i].intervalo = $scope.servicioEditado.intervalo;
            $rootScope.serviciosParaAgregar[i].ultimoRealizado = $scope.servicioEditado.ultimoRealizado;
            console.log($scope.servicioEditado.ultimoRealizado);
            console.log($rootScope.serviciosParaAgregar[i].ultimoRealizado);
            break;
        }
      }
    }

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
    $scope.putSize();
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.4em");
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.2em");
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
        var h=document.getElementsByTagName('h4');
        for(var k=0;k<h.length;k++){
          h[k].setAttribute("style","font-size: 1.1em");
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
