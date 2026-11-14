<!-- perguntas que abrem e fecham -->
<template>
  <div class="acordeao">
    <div class="acordeao__item" v-for="(item, i) in itens" :key="item.pergunta">

      <h3 class="acordeao__titulo">
        <button type="button"
                @click="alternar(i)"
                :aria-expanded="i === aberto">
          <span>{{ item.pergunta }}</span>
          <span class="acordeao__sinal" :class="{ girado: i === aberto }">▾</span>
        </button>
      </h3>

      <div class="acordeao__corpo" :class="{ aberto: i === aberto }">
        <p>{{ item.resposta }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Acordeao',

  // cada item tem pergunta e resposta
  props: {
    itens: Array
  },

  data () {
    return {
      // -1 = nenhuma aberta
      aberto: -1
    }
  },

  methods: {
    alternar (i) {
      // clicou na que ja estava aberta? fecha
      this.aberto = (this.aberto === i) ? -1 : i
    }
  }
}
</script>
