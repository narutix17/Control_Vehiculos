/**
 * Controlador utilizado para editar servicios de un vehiculo ya creado.
 * Utilizado en: editarServicio.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')

app.controller("EditarServicio", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout){

    $scope.servicioEditado = {};

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.$watch(function(){
      return $rootScope.chosenService[0].ultimoRealizado;
    }, function(){
      $ionicLoading.hide();
      $scope.putSize();
    });

    // Editar un servicio de la base de datos
    $scope.editarServicio = function(){

      console.log("Editando servicio");
      var query = "UPDATE servicio SET idTipoIntervalo=?, intervalo=?, ultimoRealizado=? WHERE id=?"
      var idTipo = 2;
      $cordovaSQLite.execute(db, query, [$scope.servicioEditado.tipo_intervalo, $scope.servicioEditado.intervalo, $scope.servicioEditado.ultimoRealizado, $rootScope.chosenService[0].id]).then(function(res){
        console.log("SERVICIO EDITADO");
      });

    }

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
