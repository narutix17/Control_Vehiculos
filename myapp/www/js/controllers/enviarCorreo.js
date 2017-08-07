//controlador showPopUp
//Controlador usado para mostrar los PopUp en la vista de Informacion del vehiculo

angular.module('app.controllers')

.controller('enviarCorreo', function($scope, $cordovaSQLite, $rootScope){



  $scope.tamanoChanged = function(){

    var tamano = $("#tamano").val();
    if (tamano == "Grande"){
      localStorage.setItem("sizeGrande",true);
      localStorage.setItem("sizeMediano",false);
      localStorage.setItem("sizePequeño",false);
      //console.log("guardado: "+localStorage.getItem("size12"));
      $rootScope.sizePequeño = true;
      $rootScope.sizetemp = true;
      var s=document.getElementsByTagName('p');
      for(i=0;i<s.length;i++){
        s[i].setAttribute("style","font-size: 1.3em");
      }
      var b=document.getElementsByTagName('button');
      for(j=0;j<b.length;j++)
      {
          b[j].setAttribute("style","font-size: 1.3em");
      }  
      
    } else if (tamano == "Mediano"){
      localStorage.setItem("sizePequeño",false);
      localStorage.setItem("sizeMediano",true);
      localStorage.setItem("sizeGrande",false);
      var s=document.getElementsByTagName('p');
      for(i=0;i<s.length;i++){
        s[i].setAttribute("style","font-size: 1.15em");
      }
      var b=document.getElementsByTagName('button');
      for(j=0;j<b.length;j++)
      {
          b[j].setAttribute("style","font-size: 1.15em");
      } 
    } else if (tamano == "Pequeño"){
      localStorage.setItem("sizePequeño",true);
      localStorage.setItem("sizeMediano",false);
      localStorage.setItem("sizeGrande",false);
      var s=document.getElementsByTagName('p');
      for(i=0;i<s.length;i++){
        s[i].setAttribute("style","font-size: 1em");
      }
      var b=document.getElementsByTagName('button');
      for(j=0;j<b.length;j++)
      {
          b[j].setAttribute("style","font-size: 1em");
      } 
    }
  };


  $scope.ordenChanged = function(){
    var orden = $("#orden").val();
    console.log("entraaaaaaaaaaaaaaa1");
    if (orden == "Placa"){
      console.log("entraaaaaaaaaaaaaaaaa2");
      $rootScope.orden = true; 
      
    }
  }

});

