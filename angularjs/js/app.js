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

    //  Detalhes do prato (abas) 
    $scope.pratoSelecionado = null;
    $scope.abasDoPrato = [];

    // Transforma a nota em estrelas: 4 -> ★★★★☆
    function estrelas(nota) {
      return '★'.repeat(nota) + '☆'.repeat(5 - nota);
    }

    $scope.verDetalhes = function (prato) {
      $scope.pratoSelecionado = prato;
      $scope.abasDoPrato = [
        { titulo: 'Descrição', conteudo: prato.descricao },
        { titulo: 'Ingredientes', conteudo: prato.ingredientes },
        { titulo: 'Avaliações', conteudo: estrelas(prato.avaliacao) + ' — "' + prato.comentario + '"' }
      ];
    };

    $scope.fecharDetalhes = function () {
      $scope.pratoSelecionado = null;
    };

        //  Carrinho e frete grátis 
    $scope.valorFreteGratis = 90;
    $scope.carrinho = [];

    $scope.adicionar = function (prato) {
      $scope.carrinho.push(prato);
    };

    $scope.removerDoCarrinho = function (indice) {
      $scope.carrinho.splice(indice, 1);
    };

    $scope.limparCarrinho = function () {
      $scope.carrinho = [];
    };

    // Soma dos preços do carrinho.
    $scope.totalCarrinho = function () {
      return $scope.carrinho.reduce(function (soma, prato) {
        return soma + prato.preco;
      }, 0);
    };

    // Quanto já foi, de 0 a 100.
    $scope.progressoFrete = function () {
      var porcento = ($scope.totalCarrinho() / $scope.valorFreteGratis) * 100;
      return Math.min(Math.round(porcento), 100);
    };

    // Quanto ainda falta em reais.
    $scope.faltaParaFrete = function () {
      return Math.max($scope.valorFreteGratis - $scope.totalCarrinho(), 0);
    };

    // Primeiro cálculo, ao abrir a página.
    recalcularPaginas();

  });