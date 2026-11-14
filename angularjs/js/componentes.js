var componentes = angular.module('temperoApp.componentes', []);

componentes.directive('paginacao', function () {
  return {
    restrict: 'E',

    scope: {
      totalPaginas: '=',
      paginaAtual: '=',
      aoMudar: '&'
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
                ng-class="{ 'ativa': n === paginaAtual }">
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

componentes.directive('menuSuspenso', function ($document) {
  return {
    restrict: 'E',

    scope: {
      rotulo: '@',
      opcoes: '=',
      selecionada: '=',
      aoEscolher: '&'
    },

    template: `
      <div class="dropdown">
        <button type="button" class="dropdown__botao"
                ng-click="alternar()"
                aria-haspopup="true"
                aria-expanded="{{ aberto }}">
          {{ rotulo }}: <strong>{{ selecionada }}</strong>
          <span class="dropdown__seta" ng-class="{ 'girada': aberto }">▾</span>
        </button>

        <ul class="dropdown__lista" ng-show="aberto">
          <li ng-repeat="opcao in opcoes">
            <button type="button"
                    ng-click="escolher(opcao)"
                    ng-class="{ 'ativa': opcao === selecionada }">
              {{ opcao }}
            </button>
          </li>
        </ul>
      </div>
    `,

    link: function (scope, element) {

      scope.aberto = false;

      scope.alternar = function () {
        scope.aberto = !scope.aberto;
      };

      scope.escolher = function (opcao) {
        scope.aberto = false;
        scope.aoEscolher({ opcao: opcao });
      };

      function cliqueFora(evento) {
        if (!element[0].contains(evento.target)) {
          scope.$apply(function () {
            scope.aberto = false;
          });
        }
      }

      $document.on('click', cliqueFora);

      scope.$on('$destroy', function () {
        $document.off('click', cliqueFora);
      });

    }
  };
});

componentes.directive('abas', function () {
  return {
    restrict: 'E',

    scope: {
      itens: '='   // lista de abas
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

      // Começa na primeira aba.
      scope.ativa = 0;

      scope.selecionar = function (indice) {
        scope.ativa = indice;
      };

      // Se a lista trocar (outro prato), volta pra primeira aba.
      scope.$watch('itens', function () {
        scope.ativa = 0;
      });

    }
  };
});


componentes.directive('barraProgresso', function () {
  return {
    restrict: 'E',

    scope: {
      valor: '<',     // número de 0 a 100 (só entra)
      rotulo: '@'     // texto fixo
    },

    template: `
      <div class="barra">
        <div class="barra__topo">
          <span>{{ rotulo }}</span>
          <strong>{{ valor }}%</strong>
        </div>

        <div class="barra__trilho"
             role="progressbar"
             aria-valuenow="{{ valor }}"
             aria-valuemin="0"
             aria-valuemax="100">
          <div class="barra__preenchimento"
               ng-style="{ width: valor + '%' }"
               ng-class="{ 'completa': valor >= 100 }"></div>
        </div>
      </div>
    `
  };
});