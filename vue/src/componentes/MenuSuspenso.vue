<!-- menu que abre pra escolher a categoria -->
<template>
  <div class="dropdown" ref="caixa">
    <button type="button" class="dropdown__botao"
            @click="alternar"
            aria-haspopup="true"
            :aria-expanded="aberto">
      {{ rotulo }}: <strong>{{ selecionada }}</strong>
      <span class="dropdown__seta" :class="{ girada: aberto }">▾</span>
    </button>

    <ul class="dropdown__lista" v-show="aberto">
      <li v-for="opcao in opcoes" :key="opcao">
        <button type="button"
                @click="escolher(opcao)"
                :class="{ ativa: opcao === selecionada }">
          {{ opcao }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuSuspenso',

  // o que vem de fora
  props: {
    rotulo: String,       // texto do botao
    opcoes: Array,        // opcoes do menu
    selecionada: String   // opcao escolhida
  },

  // avisa a pagina quando escolhem uma opcao
  emits: ['escolher'],

  data () {
    return {
      aberto: false
    }
  },

  methods: {
    // abre e fecha o menu
    alternar () {
      this.aberto = !this.aberto
    },

    // escolheu: avisa e fecha
    escolher (opcao) {
      this.aberto = false
      this.$emit('escolher', opcao)
    },

    // fecha se clicar fora
    cliqueFora (evento) {
      if (!this.$refs.caixa.contains(evento.target)) {
        this.aberto = false
      }
    }
  },

  // o listener entra quando o componente aparece na tela
  mounted () {
    document.addEventListener('click', this.cliqueFora)
  },

  // e sai quando ele e removido
  beforeUnmount () {
    document.removeEventListener('click', this.cliqueFora)
  }
}
</script>
