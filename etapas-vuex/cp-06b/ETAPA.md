# Etapa cp-06b: Assistente de comandos (estado final do dia) (Vuex)

**Bloco 6b.** O assistente de comandos substitui o filtro por IA: a IA propõe um plano de ações, a pessoa aprova, e cada ação roda pelo mesmo caminho da tela. Entram a lista permitida de ações e o componente ComandosIA. Este é o estado final do dia: o checkpoint cp-07 usa exatamente este código.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/components/ComandosIA.vue`
- `src/utils/acoes.js`

**Arquivos alterados**

- `src/services/ia.js`
- `src/views/ListaView.vue`

**Arquivos removidos**

- `src/components/BuscaPorIA.vue`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- “adicione revisar o router e mostre as pendentes” gera um plano de duas ações, e “Fazer tudo” adiciona a tarefa e filtra a lista.
- “apague tudo” não apaga nada e mostra a mensagem de plano vazio.
- Digitar o pedido sozinho não altera a lista.

## Como rodar

```bash
npm install
npm run dev
```

Em outro terminal, suba o proxy local da IA em modo simulado (sem chave e sem internet):

```bash
USAR_MOCK=1 node ../../server/proxy.mjs      # PowerShell: $env:USAR_MOCK=1; node ../../server/proxy.mjs
```

## Próxima etapa

Fechamento: build, checklist e a demonstração final de MCP.
