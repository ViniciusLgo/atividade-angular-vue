// modulo principal
angular.module('temperoApp', [
  'temperoApp.dados',
  'temperoApp.componentes'
]);

// Controller da pagina
angular.module('temperoApp')
  .controller('CardapioController', function ($scope, CardapioService) {
    $scope.pratos = CardapioService.listar();

    
    // Paginação
    $scope.porPagina = 4;
    $scope.paginaAtual = 1;
    $scope.totalPaginas = Math.ceil($scope.pratos.length / $scope.porPagina);

    // Só os pratos da página atual.
    $scope.pratosDaPagina = function () {
      var inicio = ($scope.paginaAtual - 1) * $scope.porPagina;
      return $scope.pratos.slice(inicio, inicio + $scope.porPagina);
    };

    $scope.irParaPagina = function (pagina) {
      $scope.paginaAtual = pagina;
    };

  });