// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngCordova'])

app.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB({ name: "controlvehiculos.db", iosDatabaseLocation:'default'});
    
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS vehiculo (placa text primary key, color text, marca text, alias text, modelo text, tipo text, imagen text, kilometraje integer, year integer)");

  });
})


/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
app.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
app.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});

app.controller("DBController", function($scope, $cordovaSQLite){

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.select();
  });

  $scope.insert = function(){
    var query = "INSERT INTO vehiculo (placa, color, marca, alias, modelo, tipo, imagen, kilometraje, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.placa, $scope.color, $scope.marca, $scope.alias, "", $scope.tipo, "", 5000, $scope.year]).then(function(result) {
      console.log("Vehiculo Agregado");
    }, function(error){
      console.log(error);
    });
  }

  $scope.select = function(){
    $scope.allSessions=[];
    var query = "SELECT alias, placa, marca, kilometraje FROM vehiculo";
    $cordovaSQLite.execute(db, query).then(function(res){
      if (res.rows.length > 0){
        for (var i=0; i<res.rows.length; i++) {
          $scope.allSessions.push({
            alias: res.rows.item(i).alias,
            placa: res.rows.item(i).placa,
            marca: res.rows.item(i).marca
          });
        }
        console.log($scope.allSessions[0].alias);
      }else{
        console.log("No hay Registros");
      }
      console.log("ESTAS LLAMANDO A SELECT");
    }, function(error){
      console.log(error);
    });
  }

});
