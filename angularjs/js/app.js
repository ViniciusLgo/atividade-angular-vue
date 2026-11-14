angular.module('temperoApp', [
  'temperoApp.dados',
  'temperoApp.componentes'
]);

angular.module('temperoApp')
  .controller('CardapioController', function ($scope, CardapioService) {

    $scope.pratos = CardapioService.listar();

    $scope.categorias = CardapioService.categorias();
    $scope.categoria = 'Todos';

    // Pratos que passam no filtro atual.
    $scope.pratosFiltrados = function () {
      if ($scope.categoria === 'Todos') {
        return $scope.pratos;
      }
      return $scope.pratos.filter(function (prato) {
        return prato.categoria === $scope.categoria;
      });
    };

    // Paginação 
    $scope.porPagina = 4;
    $scope.paginaAtual = 1;
    $scope.totalPaginas = 1;

    // Recalcula as páginas e volta pra primeira.
    function recalcularPaginas() {
      var total = $scope.pratosFiltrados().length;
      $scope.totalPaginas = Math.ceil(total / $scope.porPagina) || 1;
      $scope.paginaAtual = 1;
    }

    $scope.pratosDaPagina = function () {
      var inicio = ($scope.paginaAtual - 1) * $scope.porPagina;
      return $scope.pratosFiltrados().slice(inicio, inicio + $scope.porPagina);
    };

    $scope.irParaPagina = function (pagina) {
      $scope.paginaAtual = pagina;
    };

    // Callback do menu suspenso.
    $scope.escolherCategoria = function (opcao) {
      $scope.categoria = opcao;
      recalcularPaginas();
    };

    // Primeiro cálculo, ao abrir a página.
    recalcularPaginas();

  });