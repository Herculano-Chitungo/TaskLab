# Etapa cp-02: Lista e Resumo (Vuex)

**Bloco 2.** Dois componentes irmãos, sem props, leem a mesma store: ListaTarefas e ResumoTarefas. O App deixa de ter a lista e o contador e passa só a compor as peças.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/components/ListaTarefas.vue`
- `src/components/ResumoTarefas.vue`

**Arquivos alterados**

- `src/App.vue`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Ao adicionar uma tarefa, os três números do Resumo mudam.
- Nem a Lista nem o Resumo recebem props.

Os exercícios (percentual concluído, por exemplo) não fazem parte das etapas: aqui só estão o código ensinado e o getter totalConcluidas, necessário ao Resumo.

## Como rodar

```bash
npm install
npm run dev
```

## Próxima etapa

Bloco 3: persistência, com carregar e salvar.
