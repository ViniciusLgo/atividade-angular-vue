<!-- abas com os detalhes do prato -->
<template>
  <div class="abas">
    <div class="abas__titulos" role="tablist">
      <button type="button"
              v-for="(item, i) in itens"
              :key="item.titulo"
              @click="ativa = i"
              :class="{ ativa: i === ativa }"
              role="tab"
              :aria-selected="i === ativa">
        {{ item.titulo }}
      </button>
    </div>

    <div class="abas__painel" role="tabpanel">
      {{ itens[ativa].conteudo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Abas',

  // as abas: cada item tem titulo e conteudo
  props: {
    itens: Array
  },

  data () {
    return {
      // comeca na primeira
      ativa: 0
    }
  },

  watch: {
    // trocou de prato, volta pra primeira aba
    itens () {
      this.ativa = 0
    }
  }
}
</script>
