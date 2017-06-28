angular.module('app.controllers')

/**
 * Controller for an specific Vehicle operations
 */
app.controller("DBControllerAgregarMantenimiento", ['$scope', '$cordovaSQLite', '$rootScope', '$ionicLoading', function($scope, $cordovaSQLite, $rootScope, $ionicLoading){

    $scope.newMantenimiento = {};

    $scope.agregarMantenimiento = function(){
        var query = "";
    }


}]);
