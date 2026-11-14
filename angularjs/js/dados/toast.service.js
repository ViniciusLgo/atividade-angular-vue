// Serviço de notificações.
angular.module('temperoApp.dados').factory('ToastService', function ($timeout) {

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

    // some sozinho em 3 segundos
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
