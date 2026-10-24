TaskLab - Gerenciador de Tarefas Integrado (Vue 3)

Projeto integrador desenvolvido para o Sábado 1 e Sábado 3 do TaskLab, reunindo gerenciamento de tarefas, filtros combinados, indicadores reativos, persistência local, navegação com Vue Router e integração inteligente com assistente de IA validado por proxy.

👤 Integrante

Herculano Henriques Chingui Chitungo

🛠️ Tecnologia Escolhida

Gerenciamento de Estado: Pinia (Vue 3)

Framework: Vue 3 (Composition API com <script setup>)

Roteamento: Vue Router 4

🚀 Comandos para Instalar e Iniciar

1. Instalação e Execução da Aplicação Frontend

Na raiz da pasta do projeto (onde está o package.json do aplicativo):

# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento
npm run dev

# Gerar o build de produção e testar via preview
npm run build
npm run preview


2. Instalação e Execução do Servidor Proxy (IA)

O servidor proxy fica localizado na pasta server/ (ao lado da pasta principal do projeto). Abra um terminal separado para iniciá-lo:

cd server
npm install

# Iniciar em modo simulado (Mock - sem necessidade de chave de API ou internet)
USAR_MOCK=1 node proxy.mjs


(Nota para usuários de PowerShell no Windows: $env:USAR_MOCK=1; node proxy.mjs)

📂 Estrutura de Pastas

src/
├── components/       # Componentes reutilizáveis (TaskForm, TaskItem, ListaTarefas, ResumoTarefas, PassosSugeridos, ComandosIA, etc.)
├── stores/           # Store global Pinia (tarefas.js com estados, getters e actions)
├── views/            # Telas da aplicação mapeadas pelo Router (ListaView, ResumoView, TarefaView, NaoEncontradaView)
├── composables/      # Funções reutilizáveis (ex: useFiltrosUrl.js)
├── utils/            # Funções utilitárias (armazenamento, filtros, sanitização, ações da IA)
├── services/         # Comunicação com serviços externos/proxy de IA (ia.js)
├── router/           # Configuração de rotas (index.js)
├── App.vue           # Componente raiz da aplicação
├── main.js           # Ponto de entrada do Vue
└── style.css         # Estilos globais e utilitários
server/               # Servidor proxy local em Node.js para isolamento de chamadas de IA


✨ Funcionalidades Implementadas

Lista e Filtros (Sábado 1):

Cadastro, conclusão, reabertura e remoção de tarefas.

Contagem dinâmica de pendentes e concluídas.

Busca por texto (case-insensitive) combinada com situação (Todas, Pendentes, Concluídas).

Preservação dos dados originais da lista durante a filtragem e limpeza rápida de filtros.

Mensagens de estado vazio inteligentes (distinguindo entre "Nenhuma cadastrada" e "Nenhuma corresponde aos filtros").

Store, Resumo e Indicadores (Pinia):

Centralização dos dados na store compartilhada sem cópias independentes ou props excessivas entre componentes irmãos.

Cálculo automático do percentual de conclusão arredondado.

Action limparConcluidas para remover todas as tarefas concluídas de uma só vez, preservando as pendentes.

Persistência e Recuperação:

Sincronização automática e persistência de dados no localStorage.

Tratamento de estados de carregamento, sucesso, erro e dados corrompidos com opção de recuperação ("Tentar de novo").

Navegação e Filtros na URL:

Configuração de rotas (/ para Lista, /resumo para Indicadores, /tarefa/:id para Detalhes/Edição, e 404 para rotas inexistentes).

Sincronização bidirecional de busca e situação com a query da URL (?busca=...&filtro=...).

Link direto no Resumo para visualizar rapidamente apenas as tarefas pendentes (?filtro=pendentes).

Detalhe, Edição e Guarda de Navegação:

Tela dedicada de edição por identificador (/tarefa/:id) com rascunho local (o input digita livremente sem afetar o estado global antes de salvar).

Guarda de navegação onBeforeRouteLeave que emite alerta de confirmação caso o usuário tente sair da página com edições pendentes não salvas.

Recursos de Inteligência Artificial (CP-06 e CP-06b):

Botão "Adicionar todos" para aceitar e inserir todas as sugestões geradas de uma vez utilizando a action adicionar da store.

Assistente de comandos com aprovação prévia: transforma pedidos em linguagem natural (ex: "Renomeie a tarefa 2 para Revisar o Router" ou "Adicione X e mostre as pendentes") em um plano estruturado de ações compreensíveis.

Oferece botões de Fazer, Fazer tudo e Descartar. Pedidos não alteram o estado automaticamente sem aprovação expressa.

Remoção mantida estritamente fora do escopo de permissões da IA por razões de segurança.

💡 Decisões Técnicas e Justificativas

Por que as tarefas ficam na store (Pinia)?
Como a aplicação possui múltiplas telas e componentes irmãos (ListaView, ResumoView, TarefaView) que precisam ler, modificar e acompanhar o mesmo conjunto de dados reativamente (como totalizadores, percentuais e listas filtradas), centralizar o estado na store elimina o repasse excessivo de props e eventos (prop drilling), mantendo a arquitetura limpa e previsível.

Por que os filtros ficam na URL (Query Params)?
Manter o estado dos filtros (busca e situação) na query da URL permite que a pessoa usuária compartilhe o link exato da listagem filtrada ou abra a mesma visão em outra aba do navegador reproduzindo exatamente o mesmo contexto visual.

Por que as chamadas de IA passam pelo proxy (server/)?
Garante segurança absoluta ao manter chaves de API secretas (como ANTHROPIC_API_KEY) exclusivamente no ambiente do servidor backend, protegendo o código do frontend exposto no navegador. Além disso, o proxy centraliza a validação rigorosa de entradas e saídas e possibilita o modo simulado (USAR_MOCK=1) para testes locais sem conexão com a internet.

🔍 Revisão e Acessibilidade (Checklist)

Build e Preview: Executado com sucesso via npm run build e npm run preview sem erros de compilação ou rotas quebradas.

Acessibilidade: Suporte a navegação por teclado com foco visível, rótulos associados em formulários (label), uso correto de role="status" em carregamentos e role="alert" em mensagens de erro.