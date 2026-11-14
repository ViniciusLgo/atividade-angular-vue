# Tempero da Bahia

Atividade de AngularJS e Vue.js da disciplina Tópicos Avançados em Programação (Prof. Elton Figueiredo da Silva) — UCSAL.

Site de um delivery fictício de comida baiana, feito duas vezes: uma em **AngularJS** (a atividade principal) e outra em **Vue.js** (o desafio extra). As duas versões têm os mesmos seis componentes, o mesmo conteúdo e o mesmo CSS, pra dar pra comparar como cada framework resolve a mesma coisa.

Aluno: Vinicius Lago Cruz

## Os 6 componentes

| Componente | Onde fica no site |
|---|---|
| Acordeão | perguntas frequentes, no fim da página |
| Paginação | botões embaixo do cardápio |
| Barra de progresso | quanto falta pro frete grátis |
| Abas | detalhes do prato: descrição, ingredientes e avaliações |
| Menu suspenso | filtro de categoria do cardápio |
| Toast | avisos no canto da tela ao mexer no pedido |

## Como rodar

### Versão AngularJS

1. Abrir o repositório no Codespaces.
2. No terminal: `python3 -m http.server 8000`
3. Na aba Portas, abrir a porta 8000 e acessar `/angularjs/`.

### Versão Vue

1. No terminal: `cd vue`
2. `npm install` (só na primeira vez)
3. `npm run dev`
4. Abrir a porta 5173 na aba Portas.

## Arquivos

```
angularjs/
|-- index.html
|-- style.css
`-- js/
    |-- app.js                      modulo principal
    |-- controllers/
    |   `-- cardapio.controller.js
    |-- dados/                      servicos e filtro
    |   |-- dados.module.js
    |   |-- cardapio.service.js
    |   |-- real.filter.js
    |   |-- toast.service.js
    |   `-- faq.service.js
    `-- componentes/                um arquivo por componente
        |-- componentes.module.js
        |-- paginacao.js
        |-- menu-suspenso.js
        |-- abas.js
        |-- barra-progresso.js
        |-- toasts.js
        `-- acordeao.js

vue/
|-- index.html
|-- package.json
|-- vite.config.js
`-- src/
    |-- main.js                     cria a aplicacao
    |-- App.vue                     componente principal
    |-- style.css                   o mesmo CSS da versao AngularJS
    |-- dados/
    |   |-- cardapio.js
    |   |-- faq.js
    |   |-- real.js
    |   `-- toast.js                avisos, com reactive()
    `-- componentes/                um arquivo .vue por componente
        |-- MenuSuspenso.vue
        |-- Paginacao.vue
        |-- Abas.vue
        |-- BarraProgresso.vue
        |-- Toasts.vue
        `-- Acordeao.vue
```

## O mesmo componente nos dois frameworks

| Conceito | AngularJS | Vue |
|---|---|---|
| Componente | diretiva com escopo isolado | arquivo `.vue` |
| Recebe dados | bindings `=`, `@`, `<` | `props` |
| Devolve dados | binding `&` (callback) | `$emit` |
| Estado interno | `$scope` | `data()` |
| Valor calculado | função no `$scope` | `computed` |
| Dois sentidos | `ng-model` | `v-model` |
| Repetir lista | `ng-repeat` | `v-for` |
| Mostrar/esconder | `ng-if` e `ng-show` | `v-if` e `v-show` |
| Clique | `ng-click` | `@click` |
| Reagir a mudança | `$watch` | `watch` |
| Entrar/sair da tela | `link` e `$destroy` | `mounted` e `beforeUnmount` |
| Estado compartilhado | serviço (`factory`) | arquivo com `reactive()` |
| Formatar valor | filtro (`\| real`) | função importada (Vue 3 tirou os filtros) |

## O que foi usado

**AngularJS:** três módulos com `app.js` orquestrando, controlador com `$scope`, diretivas com escopo isolado e bindings `=`, `@`, `&` e `<`, três factories, filtro próprio, `ng-model`, `ng-change`, `ng-click`, `ng-repeat`, `ng-if`, `ng-show`, `ng-class`, `ng-style`, `$timeout`, `$document` e `$watch`.

**Vue:** componentes `.vue` com `App.vue` orquestrando, `props` e `$emit`, `data` e `computed`, `v-model`, `v-for`, `v-if`, `v-show`, `:class`, `:style`, `watch`, lifecycle hooks `mounted` e `beforeUnmount`, e um estado compartilhado com `reactive()`.

## Responsividade

Feita com CSS Grid, Flexbox e media queries em 600px e 900px. O cardápio fica com 1 coluna no celular, 2 no tablet e 3 no computador. As duas versões usam o mesmo arquivo de estilo.
