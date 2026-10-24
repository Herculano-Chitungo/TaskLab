# Etapa cp-05: Detalhe e edição (Pinia)

**Bloco 5.** Cada tarefa ganha uma tela em /tarefa/:id, com edição por rascunho e remoção. A store ganha porId, editar e remover, e o item da lista ganha o link Detalhes.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/views/TarefaView.vue`

**Arquivos alterados**

- `src/components/TaskItem.vue`
- `src/router/index.js`
- `src/stores/tarefas.js`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Salvar um título novo muda a lista e o Resumo.
- Cancelar devolve o título salvo ao campo.
- Remover uma tarefa volta para a lista, sem ela.

## Como rodar

```bash
npm install
npm run dev
```

## Próxima etapa

Bloco 6: a IA integrada ao Vue.
