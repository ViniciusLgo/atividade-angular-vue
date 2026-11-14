angular.module('temperoApp.componentes', []);

var componentes = angular.module('temperoApp.componentes', []);

componentes.directive('paginacao', function () {
  return {
    restrict: 'E',

    scope: {
      totalPaginas: '=',   // número total de paginas
      paginaAtual: '=',    // página que está aberta
      aoMudar: '&'         // função chamada ao trocar de página
    },

    template: `
      <nav class="paginacao" aria-label="Navegação do cardápio">
        <button type="button"
                ng-click="mudar(paginaAtual - 1)"
                ng-disabled="paginaAtual === 1">
          ‹ Anterior
        </button>

        <button type="button"
                ng-repeat="n in paginas()"
                ng-click="mudar(n)"
                ng-class="{ 'ativa': n === paginaAtual }"
                aria-current="{{ n === paginaAtual ? 'page' : 'false' }}">
          {{ n }}
        </button>

        <button type="button"
                ng-click="mudar(paginaAtual + 1)"
                ng-disabled="paginaAtual === totalPaginas">
          Próxima ›
        </button>
      </nav>
    `,

    link: function (scope) {

      scope.paginas = function () {
        var lista = [];
        for (var i = 1; i <= scope.totalPaginas; i++) {
          lista.push(i);
        }
        return lista;
      };

      scope.mudar = function (pagina) {
        if (pagina < 1 || pagina > scope.totalPaginas) {
          return;
        }
        scope.aoMudar({ pagina: pagina });
      };

    }
  };
});