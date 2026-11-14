<!-- componente principal: ele junta todos os outros -->
<template>
  <!-- topo do site -->
  <header class="cabecalho">
    <div class="container">
      <h1>Tempero <span>da Bahia</span></h1>
      <p>Comida baiana na sua porta</p>
    </div>
  </header>

  <main class="container">

    <!-- cardapio com filtro e paginacao -->
    <section class="secao">
      <h2>Cardápio</h2>

      <div class="barra-filtro">
        <MenuSuspenso rotulo="Categoria"
                      :opcoes="categorias"
                      :selecionada="categoria"
                      @escolher="escolherCategoria" />

        <input type="search" class="campo-busca"
               v-model="busca"
               @input="paginaAtual = 1"
               placeholder="Buscar prato...">

        <span class="info">{{ pratosFiltrados.length }} itens</span>
      </div>

      <div class="grade">
        <article class="prato" v-for="prato in pratosDaPagina" :key="prato.id">
          <span class="etiqueta">{{ prato.categoria }}</span>
          <h3>{{ prato.nome }}</h3>
          <p class="prato__desc">{{ prato.descricao }}</p>
          <p class="prato__preco">{{ real(prato.preco) }}</p>
          <div class="prato__botoes">
            <button type="button" class="botao-link" @click="verDetalhes(prato)">
              Ver detalhes
            </button>
            <button type="button" class="botao-cheio" @click="adicionar(prato)">
              + Adicionar
            </button>
          </div>
        </article>
      </div>

      <Paginacao :total-paginas="totalPaginas"
                 :pagina-atual="paginaAtual"
                 @mudar="paginaAtual = $event" />

      <p class="info">Página {{ paginaAtual }} de {{ totalPaginas }}</p>
    </section>

    <!-- carrinho e barra do frete gratis -->
    <section class="secao">
      <h2>Seu pedido</h2>

      <BarraProgresso :valor="progressoFrete" rotulo="Progresso para o frete grátis" />

      <p class="info" v-if="faltaParaFrete > 0">
        Faltam <strong class="destaque">{{ real(faltaParaFrete) }}</strong> para o frete grátis.
      </p>
      <p class="info destaque" v-else>
        Parabéns! Seu pedido tem frete grátis.
      </p>

      <ul class="carrinho" v-if="carrinho.length > 0">
        <li v-for="(item, i) in carrinho" :key="i">
          <span>{{ item.nome }}</span>
          <span>
            {{ real(item.preco) }}
            <button type="button" class="botao-fechar"
                    @click="removerDoCarrinho(i)" aria-label="Remover item">✕</button>
          </span>
        </li>
      </ul>

      <p class="info" v-else>
        Seu carrinho está vazio. Adicione pratos do cardápio.
      </p>

      <div class="carrinho__rodape" v-if="carrinho.length > 0">
        <strong>Total: <span class="destaque">{{ real(totalCarrinho) }}</span></strong>
        <button type="button" class="botao-link" @click="limparCarrinho">Limpar</button>
      </div>
    </section>

    <!-- detalhes do prato que foi clicado -->
    <section class="secao" v-if="pratoSelecionado">
      <div class="detalhe__topo">
        <h2>{{ pratoSelecionado.nome }}</h2>
        <button type="button" class="botao-fechar"
                @click="pratoSelecionado = null" aria-label="Fechar detalhes">✕</button>
      </div>

      <Abas :itens="abasDoPrato" />
    </section>

    <!-- perguntas frequentes -->
    <section class="secao">
      <h2>Perguntas frequentes</h2>
      <Acordeao :itens="faq" />
    </section>

  </main>

  <!-- rodape -->
  <footer class="rodape">
    <div class="container">
      <p>Atividade de Vue.js · Vinicius Lago Cruz</p>
    </div>
  </footer>

  <!-- avisos que aparecem no canto -->
  <Toasts />
</template>

<script>
import MenuSuspenso from './componentes/MenuSuspenso.vue'
import Paginacao from './componentes/Paginacao.vue'
import Abas from './componentes/Abas.vue'
import BarraProgresso from './componentes/BarraProgresso.vue'
import Toasts from './componentes/Toasts.vue'
import Acordeao from './componentes/Acordeao.vue'

import { pratos, categorias } from './dados/cardapio.js'
import { perguntas } from './dados/faq.js'
import { real } from './dados/real.js'
import { toast } from './dados/toast.js'

export default {
  name: 'App',

  components: {
    MenuSuspenso,
    Paginacao,
    Abas,
    BarraProgresso,
    Toasts,
    Acordeao
  },

  data () {
    return {
      pratos: pratos,
      categorias: categorias,
      faq: perguntas,

      categoria: 'Todos',   // filtro de categoria
      busca: '',            // o que o usuario digitou na busca

      porPagina: 4,
      paginaAtual: 1,

      carrinho: [],
      valorFreteGratis: 90,

      pratoSelecionado: null
    }
  },

  computed: {
    // pratos que passam no filtro e na busca
    pratosFiltrados () {
      let lista = this.pratos

      if (this.categoria !== 'Todos') {
        lista = lista.filter(p => p.categoria === this.categoria)
      }

      if (this.busca) {
        const termo = this.busca.toLowerCase()
        lista = lista.filter(p => p.nome.toLowerCase().includes(termo))
      }

      return lista
    },

    // quantas paginas o filtro de agora gera
    totalPaginas () {
      return Math.ceil(this.pratosFiltrados.length / this.porPagina) || 1
    },

    // so os pratos da pagina de agora
    pratosDaPagina () {
      const inicio = (this.paginaAtual - 1) * this.porPagina
      return this.pratosFiltrados.slice(inicio, inicio + this.porPagina)
    },

    // soma tudo que esta no carrinho
    totalCarrinho () {
      return this.carrinho.reduce((soma, prato) => soma + prato.preco, 0)
    },

    // quanto ja foi, de 0 a 100
    progressoFrete () {
      return Math.min(Math.round((this.totalCarrinho / this.valorFreteGratis) * 100), 100)
    },

    // quanto ainda falta em reais
    faltaParaFrete () {
      return Math.max(this.valorFreteGratis - this.totalCarrinho, 0)
    },

    // as 3 abas do prato que foi clicado
    abasDoPrato () {
      if (!this.pratoSelecionado) {
        return []
      }
      const p = this.pratoSelecionado
      return [
        { titulo: 'Descrição',    conteudo: p.descricao },
        { titulo: 'Ingredientes', conteudo: p.ingredientes },
        { titulo: 'Avaliações',   conteudo: this.estrelas(p.avaliacao) + ' — "' + p.comentario + '"' }
      ]
    }
  },

  methods: {
    real,

    // nota virando estrelas: 4 vira ★★★★☆
    estrelas (nota) {
      return '★'.repeat(nota) + '☆'.repeat(5 - nota)
    },

    // quando escolhe uma categoria no menu
    escolherCategoria (opcao) {
      this.categoria = opcao
      this.paginaAtual = 1
      this.pratoSelecionado = null
    },

    verDetalhes (prato) {
      this.pratoSelecionado = prato
    },

    adicionar (prato) {
      this.carrinho.push(prato)

      if (this.faltaParaFrete === 0) {
        toast.sucesso('Frete grátis liberado!')
      } else {
        toast.info(prato.nome + ' adicionado ao pedido')
      }
    },

    removerDoCarrinho (i) {
      const prato = this.carrinho[i]
      this.carrinho.splice(i, 1)
      toast.erro(prato.nome + ' removido do pedido')
    },

    limparCarrinho () {
      if (this.carrinho.length === 0) {
        toast.erro('Seu pedido já está vazio')
        return
      }
      this.carrinho = []
      toast.info('Pedido esvaziado')
    }
  },

  // roda uma vez, quando a pagina termina de carregar
  mounted () {
    toast.info('Bem-vindo ao Tempero da Bahia!')
  }
}
</script>
