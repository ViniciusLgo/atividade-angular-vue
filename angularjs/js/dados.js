

var dados = angular.module('temperoApp.dados', []);

dados.factory('CardapioService', function () {

  var pratos = [
    { id: 1,  nome: 'Moqueca de peixe',  categoria: 'Pratos',     preco: 68.90, descricao: 'Peixe cozido no leite de coco com dendê, pimentão e coentro.', ingredientes: 'Robalo, leite de coco, azeite de dendê, pimentão, tomate, coentro.', avaliacao: 5, comentario: 'A melhor moqueca que já comi fora de Itaparica.' },
    { id: 2,  nome: 'Vatapá',            categoria: 'Pratos',     preco: 42.00, descricao: 'Creme de pão, camarão seco e castanha, servido com arroz.', ingredientes: 'Pão, camarão seco, castanha de caju, amendoim, dendê, gengibre.', avaliacao: 4, comentario: 'Bem temperado e cremoso.' },
    { id: 3,  nome: 'Caruru',            categoria: 'Pratos',     preco: 38.00, descricao: 'Quiabo refogado com camarão seco e castanha.', ingredientes: 'Quiabo, camarão seco, castanha, amendoim, dendê, cebola.', avaliacao: 4, comentario: 'Tradicional do jeito certo.' },
    { id: 4,  nome: 'Bobó de camarão',   categoria: 'Pratos',     preco: 72.50, descricao: 'Camarão em purê de aipim com leite de coco e dendê.', ingredientes: 'Camarão, aipim, leite de coco, dendê, tomate, coentro.', avaliacao: 5, comentario: 'Porção generosa, vale o preço.' },
    { id: 5,  nome: 'Xinxim de galinha', categoria: 'Pratos',     preco: 45.00, descricao: 'Galinha no dendê com camarão seco e castanha moída.', ingredientes: 'Frango, camarão seco, castanha, amendoim, dendê, cebola.', avaliacao: 4, comentario: 'Chegou quentinho.' },
    { id: 6,  nome: 'Acarajé (3 un.)',   categoria: 'Petiscos',   preco: 24.00, descricao: 'Bolinho de feijão-fradinho frito no dendê, recheado com vatapá.', ingredientes: 'Feijão-fradinho, cebola, sal, dendê, vatapá, camarão.', avaliacao: 5, comentario: 'Crocante por fora e macio por dentro.' },
    { id: 7,  nome: 'Abará (3 un.)',     categoria: 'Petiscos',   preco: 22.00, descricao: 'Massa de feijão-fradinho cozida na folha de bananeira.', ingredientes: 'Feijão-fradinho, dendê, cebola, folha de bananeira.', avaliacao: 4, comentario: 'Mais leve que o acarajé.' },
    { id: 8,  nome: 'Bolinho de aipim',  categoria: 'Petiscos',   preco: 18.00, descricao: 'Seis bolinhos de aipim com queijo coalho.', ingredientes: 'Aipim, queijo coalho, ovo, farinha de trigo.', avaliacao: 3, comentario: 'Bom, mas veio pouco queijo.' },
    { id: 9,  nome: 'Água de coco',      categoria: 'Bebidas',    preco: 8.00,  descricao: 'Copo de 500 ml, gelada.', ingredientes: 'Água de coco natural.', avaliacao: 5, comentario: 'Gelada do jeito que tem que ser.' },
    { id: 10, nome: 'Suco de cajá',      categoria: 'Bebidas',    preco: 11.00, descricao: 'Suco natural da fruta, 400 ml.', ingredientes: 'Polpa de cajá, água, açúcar (opcional).', avaliacao: 4, comentario: 'Bem azedinho, do jeito certo.' },
    { id: 11, nome: 'Cocada branca',     categoria: 'Sobremesas', preco: 9.50,  descricao: 'Cocada cremosa feita na hora.', ingredientes: 'Coco fresco, açúcar, leite condensado.', avaliacao: 4, comentario: 'Doce na medida.' },
    { id: 12, nome: 'Quindim',           categoria: 'Sobremesas', preco: 7.50,  descricao: 'Quindim tradicional de gema e coco.', ingredientes: 'Gema de ovo, açúcar, coco ralado, manteiga.', avaliacao: 5, comentario: 'Lembrou o da minha avó.' }
  ];

  return {
    listar: function () {
      return pratos;
    },
    categorias: function () {
      return ['Todos', 'Pratos', 'Petiscos', 'Bebidas', 'Sobremesas'];
    }
  };
});

dados.filter('real', function () {
  return function (valor) {
    if (valor === undefined || valor === null) {
      return '';
    }
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  };
});

// Serviço de notificações.
dados.factory('ToastService', function ($timeout) {

  var lista = [];
  var proximoId = 1;

  function fechar(id) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) {
        lista.splice(i, 1);
        return;
      }
    }
  }

  function mostrar(mensagem, tipo) {
    var toast = {
      id: proximoId++,
      mensagem: mensagem,
      tipo: tipo
    };
    lista.push(toast);

    // Some sozinho depois de 3 segundos.
    $timeout(function () {
      fechar(toast.id);
    }, 3000);
  }

  return {
    lista: lista,
    sucesso: function (mensagem) { mostrar(mensagem, 'sucesso'); },
    erro:    function (mensagem) { mostrar(mensagem, 'erro'); },
    info:    function (mensagem) { mostrar(mensagem, 'info'); },
    fechar:  fechar
  };

});