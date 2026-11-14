# Tempero da Bahia

Atividade de AngularJS da disciplina Tópicos Avançados em Programação (Prof. Elton Figueiredo da Silva) — UCSAL.

Site de um delivery fictício de comida baiana, feito com AngularJS 1.8.3 e CSS próprio, desenvolvido no GitHub Codespaces.

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

1. Abrir o repositório no Codespaces.
2. No terminal: `python3 -m http.server 8000`
3. Na aba Portas, abrir a porta 8000 e acessar `/angularjs/`.

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
```

## Módulos

- `temperoApp.dados` — CardapioService, ToastService, FaqService e o filtro `real`
- `temperoApp.componentes` — as 6 diretivas
- `temperoApp` — módulo principal, que junta os outros dois

## O que foi usado

- diretivas com escopo isolado e bindings `=`, `@`, `&` e `<`
- `$scope` e `ng-model` pra ligar os dados à tela
- factories pra guardar os dados e a lógica
- filtro próprio pra formatar o preço em real
- `ng-click`, `ng-repeat`, `ng-if`, `ng-show`, `ng-class` e `ng-style`
- `$timeout`, `$document` e `$watch`

## Responsividade

Feita com CSS Grid, Flexbox e media queries em 600px e 900px. O cardápio fica com 1 coluna no celular, 2 no tablet e 3 no computador.
