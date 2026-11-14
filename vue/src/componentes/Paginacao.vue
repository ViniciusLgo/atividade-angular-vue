<!-- botoes de paginacao do cardapio -->
<template>
  <nav class="paginacao" aria-label="Navegação do cardápio">
    <button type="button"
            @click="mudar(paginaAtual - 1)"
            :disabled="paginaAtual === 1">
      ‹ Anterior
    </button>

    <button type="button"
            v-for="n in paginas"
            :key="n"
            @click="mudar(n)"
            :class="{ ativa: n === paginaAtual }">
      {{ n }}
    </button>

    <button type="button"
            @click="mudar(paginaAtual + 1)"
            :disabled="paginaAtual === totalPaginas">
      Próxima ›
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Paginacao',

  // o que vem de fora
  props: {
    totalPaginas: Number,  // quantas paginas tem
    paginaAtual: Number    // pagina aberta agora
  },

  // avisa a pagina que o usuario quer trocar
  emits: ['mudar'],

  computed: {
    // monta os numeros dos botoes: [1, 2, 3...]
    paginas () {
      const lista = []
      for (let i = 1; i <= this.totalPaginas; i++) {
        lista.push(i)
      }
      return lista
    }
  },

  methods: {
    mudar (pagina) {
      if (pagina < 1 || pagina > this.totalPaginas) {
        return
      }
      this.$emit('mudar', pagina)
    }
  }
}
</script>
