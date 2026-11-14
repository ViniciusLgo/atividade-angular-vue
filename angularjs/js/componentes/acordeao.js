// perguntas que abrem e fecham
angular.module('temperoApp.componentes').directive('acordeao', function () {
  return {
    restrict: 'E',

    scope: {
      itens: '<'
    },

    template: `
      <div class="acordeao">
        <div class="acordeao__item" ng-repeat="item in itens">

          <h3 class="acordeao__titulo">
            <button type="button"
                    ng-click="alternar($index)"
                    aria-expanded="{{ $index === aberto }}">
              <span>{{ item.pergunta }}</span>
              <span class="acordeao__sinal" ng-class="{ 'girado': $index === aberto }">▾</span>
            </button>
          </h3>

          <div class="acordeao__corpo" ng-class="{ 'aberto': $index === aberto }">
            <p>{{ item.resposta }}</p>
          </div>

        </div>
      </div>
    `,

    link: function (scope) {

      // -1 = nenhuma aberta
      scope.aberto = -1;

      scope.alternar = function (indice) {
        // clicou na que ja estava aberta? fecha
        scope.aberto = (scope.aberto === indice) ? -1 : indice;
      };

    }
  };
});
