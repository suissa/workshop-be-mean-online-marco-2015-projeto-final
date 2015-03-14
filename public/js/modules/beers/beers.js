(function() {
  'use strict';

  angular.module('myApp.beers', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/beers', {
      templateUrl: 'modules/beers/views/beers.html',
      controller: 'BeersCtrl'
    })
    .when('/beers/create', {
      templateUrl: 'modules/beers/views/create.html',
      controller: 'BeersCreateCtrl'
    })
    .when('/beers/:id', {
      templateUrl: 'modules/beers/views/get.html',
      controller: 'BeersGetCtrl'
    })
    .when('/beers/:id/edit', {
      templateUrl: 'modules/beers/views/update.html',
      controller: 'BeersEditCtrl'
    });
  }])

  .controller('BeersCtrl', BeersCtrl)
  .controller('BeersGetCtrl', BeersGetCtrl)
  .controller('BeersCreateCtrl', BeersCreateCtrl)
  .controller('BeersEditCtrl', BeersEditCtrl);

  function BeersCreateCtrl($scope, $http) {

    $scope.create = function(cerveja) {
      var url = 'http://localhost:3000/api/beers'
        , method= 'POST'
        ;

      $http({
        url: url
      , method: method
      , data: cerveja
      })
      .success(function(data) {
        console.log('Sucesso: ', data);
        $scope.msg = 'Cerveja ' + cerveja.name + ' cadastrada com sucesso!';
      })
      .error(function(data) {
        console.log('Erro: ', data);
        $scope.msg = 'Cerveja ' + cerveja.name + ' não pode ser cadastrada!';
      });
    }
  }

  function BeersCtrl($scope, $http) {
    $scope.msg = 'Listagem das cervejas';
    $scope.reverse = false;
    $scope.predicate = 'name';

    $scope.ordenar = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse
    }

    var url = 'http://localhost:3000/api/beers'
      , method = 'GET'
      ;

    $http({
      url: url
    , method: method
    })
    .success(function(data) {
      $scope.cervejas = data;
      console.log('Sucesso', data);
    })
    .error(function(data) {
      console.log('Erro: ', data);
    });

    $scope.remove = function(cerveja) {
      if(confirm("Deseja remover a cerveja " + cerveja.name + "?")) {
        var _url = url + '/' + cerveja._id
          , method = 'DELETE'
          ;

        $http({
          url: _url,
          method: method
        })
        .success(function(data) {
          console.log('Sucesso: ', data);
          var index = $scope.cervejas.indexOf(cerveja);
          $scope.cervejas.splice(index, 1);
        })
        .error(function(data) {
          console.log('Erro: ', data);
        })
      }
    }
  }

  function BeersGetCtrl($scope, $http, $routeParams) {

    var id = $routeParams.id
      , url = 'http://localhost:3000/api/beers/'+id
      , method = 'GET'
      ;

    $http({
      url: url
    , method: method
    })
    .success(function(data) {
      $scope.cerveja = data;
      console.log('Sucesso', data);
    })
    .error(function(data) {
      console.log('Erro: ', data);
    });
  }

  function BeersEditCtrl($scope, $http, $routeParams) {

    var id = $routeParams.id
      , url = 'http://localhost:3000/api/beers/'+id
      , method = 'GET'
      ;

    $http({
      url: url
    , method: method
    })
    .success(function(data) {
      $scope.cerveja = data;
      console.log('Sucesso', data);
    })
    .error(function(data) {
      console.log('Erro: ', data);
    });

    $scope.update = function(cerveja) {
      var method = 'PUT';

      $http({
        url: url
      , method: method
      , data: cerveja
      })
      .success(function(data) {
        console.log('Sucesso: ', data);
        $scope.msg = 'Cerveja ' + cerveja.name + ' alterada com sucesso!';
      })
      .error(function(data) {
        console.log('Erro: ', data);
        $scope.msg = 'Cerveja ' + cerveja.name + ' não pode ser alterada!';
      });
    }
  }

  BeersCtrl.$inject = ['$scope', '$http'];
  BeersCreateCtrl.$inject = ['$scope', '$http']
  BeersGetCtrl.$inject = ['$scope', '$http', '$routeParams']
  BeersEditCtrl.$inject = ['$scope', '$http', '$routeParams'];

})();