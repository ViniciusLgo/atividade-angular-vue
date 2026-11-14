angular.module('temperoApp.dados').filter('real', function () {
  return function (valor) {
    if (valor === undefined || valor === null) {
      return '';
    }
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  };
});
