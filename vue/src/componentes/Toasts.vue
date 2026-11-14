<!-- avisos que aparecem no canto da tela -->
<template>
  <div class="toasts" aria-live="polite">
    <div class="toast"
         v-for="aviso in avisos"
         :key="aviso.id"
         :class="'toast--' + aviso.tipo"
         role="status">
      <span>{{ aviso.mensagem }}</span>
      <button type="button" @click="fechar(aviso.id)" aria-label="Fechar aviso">✕</button>
    </div>
  </div>
</template>

<script>
// esse componente nao recebe nada por props:
// ele pega a lista direto do arquivo de avisos
import { avisos, fechar } from '../dados/toast.js'

export default {
  name: 'Toasts',

  data () {
    return {
      avisos
    }
  },

  methods: {
    fechar
  }
}
</script>
