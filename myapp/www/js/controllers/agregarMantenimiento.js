/**
 * Controlador utilizado para agregar mantenimientos a un vehiculo
 * Utilizado en: nuevoMantenimiento.html
 * Version: 1.0
 * Creador: Leonardo Kuffo
 */
angular.module('app.controllers')
/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerAgregarMantenimiento", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', '$timeout', function($scope, $cordovaSQLite, $rootScope, $ionicLoading, $timeout){

    $scope.newMantenimiento = {};

    $scope.$on('$ionicView.afterEnter', function(){
        $scope.putSize();
    });

    $scope.agregarMantenimiento = function(){
        console.log($scope.newMantenimiento.nombreServ);
        var nombreServicio = $scope.newMantenimiento.nombreServ;

        var servId = "";
        for (var i = 0; i< $rootScope.selectedVehicleServices.length; i++){
            console.log($rootScope.selectedVehicleServices[i].nombre);
            console.log(nombreServicio);
            if ($rootScope.selectedVehicleServices[i].nombre === nombreServicio){
                servId = $rootScope.selectedVehicleServices[i].id;
                break;
            }
        }
        console.log(servId);
        var query = "INSERT INTO mantenimiento  (idServicio, detalle, precio, fechaRealizado) VALUES (?, ?, ?, ?)";
        $cordovaSQLite.execute(db, query, [servId, $scope.newMantenimiento.obs, $scope.newMantenimiento.valor ,$scope.newMantenimiento.fecha]).then(function(res){
            console.log("Mantenimiento Agregado");
        });



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
        var h=document.getElementsByTagName('textarea');
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
        var h=document.getElementsByTagName('textarea');
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
        var h=document.getElementsByTagName('textarea');
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
}]);
