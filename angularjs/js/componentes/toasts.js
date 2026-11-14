// avisos que aparecem no canto da tela
angular.module('temperoApp.componentes').directive('toasts', function (ToastService) {
  return {
    restrict: 'E',
    scope: {},

    template: `
      <div class="toasts" aria-live="polite">
        <div class="toast"
             ng-repeat="t in toasts"
             ng-class="'toast--' + t.tipo"
             role="status">
          <span>{{ t.mensagem }}</span>
          <button type="button" ng-click="fechar(t.id)" aria-label="Fechar aviso">✕</button>
        </div>
      </div>
    `,

    link: function (scope) {
      scope.toasts = ToastService.lista;
      scope.fechar = ToastService.fechar;
    }
  };
});
