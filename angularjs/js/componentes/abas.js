// abas com os detalhes do prato
angular.module('temperoApp.componentes').directive('abas', function () {
  return {
    restrict: 'E',

    scope: {
      itens: '='   // as abas
    },

    template: `
      <div class="abas">
        <div class="abas__titulos" role="tablist">
          <button type="button"
                  ng-repeat="item in itens"
                  ng-click="selecionar($index)"
                  ng-class="{ 'ativa': $index === ativa }"
                  role="tab"
                  aria-selected="{{ $index === ativa }}">
            {{ item.titulo }}
          </button>
        </div>

        <div class="abas__painel" role="tabpanel">
          {{ itens[ativa].conteudo }}
        </div>
      </div>
    `,

    link: function (scope) {

      // comeca na primeira
      scope.ativa = 0;

      scope.selecionar = function (indice) {
        scope.ativa = indice;
      };

      // trocou de prato, volta pra primeira
      scope.$watch('itens', function () {
        scope.ativa = 0;
      });

    }
  };
});
