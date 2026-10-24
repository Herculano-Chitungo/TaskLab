# Etapa cp-01: Store (Vuex)

**Bloco 1.** O estado das tarefas sai do useTasks e vai para uma store única. O App lê as tarefas da store e dispara actions. A store já tem os getters concluidas e totalConcluidas, que o Resumo vai usar no bloco 2. O useTasks deixa de existir.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/store/index.js`

**Arquivos alterados**

- `src/App.vue`
- `src/components/BasePanel.vue`
- `src/components/TaskItem.vue`
- `src/main.js`
- `vite.config.js`
- `package.json`

**Arquivos removidos**

- `src/composables/useTasks.js`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Adicionar uma tarefa aumenta o contador de pendentes.
- Marcar uma tarefa o diminui.
- No Vue DevTools, a store mostra a lista de tarefas atualizada.

## Como rodar

```bash
npm install
npm run dev
```

## Próxima etapa

Bloco 2: Lista e Resumo, dois componentes irmãos que leem a mesma store.
