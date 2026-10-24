# Etapa cp-03: Persistência (Vuex)

**Bloco 3.** As tarefas passam a ser carregadas de forma assíncrona e salvas a cada mudança. Entram a camada de armazenamento, os estados de carregando e de erro e a persistência (um plugin no Vuex, um watch no Pinia).

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/utils/armazenamento.js`

**Arquivos alterados**

- `src/App.vue`
- `src/store/index.js`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Adicionar uma tarefa e recarregar a página mantém a tarefa.
- Com o valor corrompido no Local Storage (por exemplo {lixo), aparece a mensagem de erro.
- “Tentar de novo” volta à lista inicial.

## Como rodar

```bash
npm install
npm run dev
```

## Próxima etapa

Bloco 4: Router, telas com endereço próprio e filtros na URL.
