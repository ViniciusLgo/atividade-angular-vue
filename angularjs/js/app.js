
angular.module('temperoApp', [
  'temperoApp.dados',
  'temperoApp.componentes'
]);

angular.module('temperoApp')
  .controller('CardapioController', function ($scope, CardapioService, ToastService, FaqService) {
    $scope.pratos = CardapioService.listar();
    $scope.faq = FaqService.listar();

    $scope.categorias = CardapioService.categorias();
    $scope.categoria = 'Todos';

    // pratos da categoria escolhida
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

    // recalcula as paginas e volta pra primeira
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

    // quando escolhe uma categoria
    $scope.escolherCategoria = function (opcao) {
      $scope.categoria = opcao;
      recalcularPaginas();
    };

    //  Detalhes do prato (abas) 
    $scope.pratoSelecionado = null;
    $scope.abasDoPrato = [];

    // nota virando estrelas: 4 vira ★★★★☆
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

      if ($scope.faltaParaFrete() === 0) {
        ToastService.sucesso('Frete grátis liberado!');
      } else {
        ToastService.info(prato.nome + ' adicionado ao pedido');
      }
    };

    $scope.removerDoCarrinho = function (indice) {
      var prato = $scope.carrinho[indice];
      $scope.carrinho.splice(indice, 1);
      ToastService.erro(prato.nome + ' removido do pedido');
    };

    $scope.limparCarrinho = function () {
      if ($scope.carrinho.length === 0) {
        ToastService.erro('Seu pedido já está vazio');
        return;
      }
      $scope.carrinho = [];
      ToastService.info('Pedido esvaziado');
    };

    $scope.totalCarrinho = function () {
      return $scope.carrinho.reduce(function (soma, prato) {
        return soma + prato.preco;
      }, 0);
    };

    // quanto ja foi, de 0 a 100
    $scope.progressoFrete = function () {
      var porcento = ($scope.totalCarrinho() / $scope.valorFreteGratis) * 100;
      return Math.min(Math.round(porcento), 100);
    };

    // quanto ainda falta em reais
    $scope.faltaParaFrete = function () {
      return Math.max($scope.valorFreteGratis - $scope.totalCarrinho(), 0);
    };

    // roda uma vez quando abre a pagina
    recalcularPaginas();

  });