// modulo principal
angular.module('temperoApp', [
  'temperoApp.dados',
  'temperoApp.componentes'
]);

// Controller da pagina
angular.module('temperoApp')
  .controller('CardapioController', function ($scope, CardapioService) {
    $scope.pratos = CardapioService.listar();

});