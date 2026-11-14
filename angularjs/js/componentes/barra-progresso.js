// barra que mostra quanto falta pro frete gratis
angular.module('temperoApp.componentes').directive('barraProgresso', function () {
  return {
    restrict: 'E',

    scope: {
      valor: '<',     // de 0 a 100
      rotulo: '@'     // texto do lado
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
