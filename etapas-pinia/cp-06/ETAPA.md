# Etapa cp-06: IA integrada ao Vue (Pinia)

**Bloco 6.** A IA entra pela store e pela URL: “Quebrar em passos” na tela de detalhe (uma action da store) e “Filtrar com IA” na lista (que preenche a URL). Entram o proxy local, o serviço da IA e a validação do que a IA devolve.

## O que mudou em relação à etapa anterior

**Arquivos novos**

- `src/components/BuscaPorIA.vue`
- `src/components/PassosSugeridos.vue`
- `src/services/ia.js`
- `src/utils/sanitizar.js`

**Arquivos alterados**

- `src/stores/tarefas.js`
- `src/utils/filtros.js`
- `src/views/ListaView.vue`
- `src/views/TarefaView.vue`
- `vite.config.js`

O arquivo `MUDANCAS.diff`, nesta pasta, mostra linha a linha o que mudou.

## Como conferir

- Os passos aceitos aparecem na lista e atualizam o Resumo.
- O filtro por IA preenche a URL, e o Voltar do navegador o desfaz.
- Um pedido novo cancela o anterior, sem respostas fora de ordem.

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

Bloco 6b: o assistente de comandos, que substitui o filtro por IA.
