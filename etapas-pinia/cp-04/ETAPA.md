# Etapa cp-04: Router (Pinia)

**Bloco 4.** O aplicativo ganha telas com endereço próprio (lista, resumo e 404) e os filtros passam a viver na URL. O App vira a casca, com o menu e o RouterView. A lista passa a ler também a URL.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/components/FiltrosTarefas.vue`
- `src/composables/useFiltrosUrl.js`
- `src/router/index.js`
- `src/utils/filtros.js`
- `src/views/ListaView.vue`
- `src/views/NaoEncontradaView.vue`
- `src/views/ResumoView.vue`

**Arquivos alterados**

- `src/App.vue`
- `src/components/ListaTarefas.vue`
- `src/main.js`
- `package.json`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Os links do menu trocam de tela sem recarregar a página.
- Um endereço inexistente mostra a tela 404.
- Um link com ?filtro=pendentes, aberto em outra aba, já vem filtrado.

## Como rodar

```bash
npm install
npm run dev
```

## Próxima etapa

Bloco 5: detalhe e edição de cada tarefa.
