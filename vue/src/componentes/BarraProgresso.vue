<!-- barra que mostra quanto falta pro frete gratis -->
<template>
  <div class="barra">
    <div class="barra__topo">
      <span>{{ rotulo }}</span>
      <strong>{{ valor }}%</strong>
    </div>

    <div class="barra__trilho"
         role="progressbar"
         :aria-valuenow="valor"
         aria-valuemin="0"
         aria-valuemax="100">
      <div class="barra__preenchimento"
           :style="{ width: valor + '%' }"
           :class="{ completa: valor >= 100 }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarraProgresso',

  // esse componente so mostra, nao tem logica nenhuma
  props: {
    valor: Number,   // de 0 a 100
    rotulo: String   // texto do lado
  }
}
</script>
