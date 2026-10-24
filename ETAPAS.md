# Mapa das etapas

Cada etapa é um projeto completo e funcional: o aplicativo como ele deve estar no fim de cada bloco. A etapa cp-07 usa exatamente o mesmo código da cp-06b.

| Etapa | Bloco | O que se constrói | Pastas |
| --- | --- | --- | --- |
| cp-00 | Antes do bloco 1 | Ponto de partida (o TaskLab do Sábado 2) | `base/` |
| cp-01 | Bloco 1 | Store | `etapas-vuex/cp-01/` e `etapas-pinia/cp-01/` |
| cp-02 | Bloco 2 | Lista e Resumo | `etapas-vuex/cp-02/` e `etapas-pinia/cp-02/` |
| cp-03 | Bloco 3 | Persistência | `etapas-vuex/cp-03/` e `etapas-pinia/cp-03/` |
| cp-04 | Bloco 4 | Router | `etapas-vuex/cp-04/` e `etapas-pinia/cp-04/` |
| cp-05 | Bloco 5 | Detalhe e edição | `etapas-vuex/cp-05/` e `etapas-pinia/cp-05/` |
| cp-06 | Bloco 6 | IA integrada ao Vue | `etapas-vuex/cp-06/` e `etapas-pinia/cp-06/` |
| cp-06b | Bloco 6b | Assistente de comandos (estado final do dia) | `etapas-vuex/cp-06b/` e `etapas-pinia/cp-06b/` |

## O que cada etapa acrescenta (arquivos novos, versão Vuex)

**cp-01: Store**

- Novos: `src/store/index.js`
- Alterados: `src/App.vue`, `src/main.js`, `package.json`
- Removidos: `src/composables/useTasks.js`

**cp-02: Lista e Resumo**

- Novos: `src/components/ListaTarefas.vue`, `src/components/ResumoTarefas.vue`
- Alterados: `src/App.vue`

**cp-03: Persistência**

- Novos: `src/utils/armazenamento.js`
- Alterados: `src/App.vue`, `src/store/index.js`

**cp-04: Router**

- Novos: `src/components/FiltrosTarefas.vue`, `src/composables/useFiltrosUrl.js`, `src/router/index.js`, `src/utils/filtros.js`, `src/views/ListaView.vue`, `src/views/NaoEncontradaView.vue`, `src/views/ResumoView.vue`
- Alterados: `src/App.vue`, `src/components/ListaTarefas.vue`, `src/main.js`, `package.json`

**cp-05: Detalhe e edição**

- Novos: `src/views/TarefaView.vue`
- Alterados: `src/components/TaskItem.vue`, `src/router/index.js`, `src/store/index.js`

**cp-06: IA integrada ao Vue**

- Novos: `src/components/BuscaPorIA.vue`, `src/components/PassosSugeridos.vue`, `src/services/ia.js`, `src/utils/sanitizar.js`
- Alterados: `src/store/index.js`, `src/utils/filtros.js`, `src/views/ListaView.vue`, `src/views/TarefaView.vue`, `vite.config.js`

**cp-06b: Assistente de comandos (estado final do dia)**

- Novos: `src/components/ComandosIA.vue`, `src/utils/acoes.js`
- Alterados: `src/services/ia.js`, `src/views/ListaView.vue`
- Removidos: `src/components/BuscaPorIA.vue`

Na versão Pinia, a store fica em `src/stores/tarefas.js` em vez de `src/store/index.js`, e o restante é equivalente.
