Plataforma de Agendamento de Sala - User Stories e Prioridades
Stack Tecnológica

Frontend: ReactJS + Tailwind CSS
Backend: NestJS
Database/Auth: Firebase

Legenda de Prioridade

🔴 P0: Crítico para MVP
🟡 P1: Importante, mas pode ser simplificado
🟢 P2: Nice to have / Pós-MVP

Feature 1: Agendamento da Sala
US1.1 - Visualizar Calendário de Agendamentos 🔴 (P0)
Como aluno ou professor
Quero visualizar um calendário com todos os agendamentos da sala
Para que eu possa verificar a disponibilidade antes de agendar
Critérios de Aceitação:

Visualização em formato de calendário semanal/mensal
Exibir horário, grupo/responsável de cada agendamento
Indicar visualmente slots disponíveis vs ocupados
Atualização em tempo real (ou ao recarregar)
Responsivo para mobile e desktop

Notas Técnicas (MVP):

Não precisa de drag-and-drop
Visualização simples de lista + calendário básico
Sem sincronização com calendários externos no MVP

US1.2 - Criar Agendamento 🔴 (P0)
Como aluno ou professor
Quero agendar a sala para um horário específico
Para que meu grupo possa utilizar o espaço
Critérios de Aceitação:

Selecionar data e horário (início e fim)
Informar título/motivo do agendamento
Informar grupo/responsável
Validar que não há conflito de horário
Receber confirmação do agendamento
Não permitir agendamentos no passado

Regras de Negócio (MVP):

O usuário só pode agendar se estiver autenticado
Horário permitido: 7h às 22h

US1.3 - Cancelar Agendamento 🟡 (P1)
Como criador de um agendamento
Quero cancelar meu próprio agendamento
Para que outros possam usar a sala
Critérios de Aceitação:

Apenas criador ou admin pode cancelar
Cancelamento até 2 horas antes do horário
Confirmação antes de cancelar
Atualizar calendário automaticamente

US1.4 - Editar Agendamento 🟢 (P2)
Status: Pós-MVP - MVP só permite criar e cancelar

Feature 2: Bate Ponto
US2.1 - Cadastrar Estagiário 🔴 (P0)
Como professor
Quero cadastrar alunos estagiários no sistema
Para que eles possam registrar ponto
Critérios de Aceitação:

Informar email do aluno
Definir horário esperado (entrada e saída)
Definir dias da semana
Aluno recebe notificação de cadastro
Professor pode editar/remover estagiário

Notas MVP:

Interface administrativa simples (lista + formulário)
Sem validação complexa de carga horária

US2.2 - Registrar Ponto 🔴 (P0)
Como aluno estagiário
Quero bater ponto na sala
Para que minha presença seja registrada
Critérios de Aceitação:

Verificar geolocalização (dentro da instituição) 🟢
Verificar horário permitido (conforme cadastro)
Registrar entrada e saída
Exibir confirmação visual
Impedir registros duplicados

Validações MVP:

Geolocalização básica (raio de 100m da instituição) 🟢
Tolerância de 15 minutos antes/depois do horário
Dois registros por dia: entrada e saída

US2.3 - Visualizar Histórico de Ponto 🟡 (P1)
Como professor
Quero ver relatório de pontos dos estagiários
Para que eu possa acompanhar frequência
Critérios de Aceitação:

Listar todos os registros por estagiário
Filtrar por data/período
Exportar relatório simples (CSV)
Indicar atrasos e faltas

MVP:

Visualização simples em tabela
Filtros básicos (sem gráficos)

US2.4 - Notificações de Ponto 🟢 (P2)
Status: Pós-MVP

Feature 3: Assinatura Eletrônica (Controle de Chaves)
US3.1 - Registrar Retirada de Chave 🔴 (P0)
Como recepcionista
Quero registrar quem retirou a chave
Para que eu saiba com quem está
Critérios de Aceitação:

Buscar aluno por nome/matrícula
Registrar horário de retirada
Marcar chave como "em uso"
Exibir quem está com a chave em destaque

MVP:

Um registro por vez (uma chave apenas)

US3.2 - Registrar Devolução de Chave 🔴 (P0)
Como recepcionista
Quero registrar devolução da chave
Para que o sistema atualize o status
Critérios de Aceitação:

Confirmar devolução
Registrar horário de devolução
Marcar chave como "disponível"
Calcular tempo de uso
Histórico de retiradas/devoluções

US3.3 - Visualizar Status da Chave 🔴 (P0)
Como qualquer usuário autenticado
Quero ver se a chave está disponível
Para que eu saiba se posso retirá-la
Critérios de Aceitação:

Status em tempo real (disponível/em uso)
Se em uso, mostrar com quem está
Horário de retirada

MVP:

Exibição simples na dashboard

Feature 4: Observações
US4.1 - Criar Observação Pública 🟡 (P1)
Como professor, recepcionista ou admin
Quero postar avisos gerais
Para que todos vejam
Critérios de Aceitação:

Criar post com título e conteúdo
Marcar como público (todos veem)
Exibir autor e data
Ordenar por mais recente

MVP:

Feed simples sem comentários
Sem edição (só criar e deletar)

US4.3 - Visualizar Feed de Observações 🟡 (P1)
Como qualquer usuário
Quero ver as observações relevantes
Para que eu fique informado
Critérios de Aceitação:

Listar observações públicas
Ordenar por data
Paginação/scroll infinito

MVP:

Lista simples sem filtros avançados

US4.2 - Criar Observação Direcionada 🟢 (P2)
Status: Pós-MVP (complexidade de permissões)

Feature 5: Eventos
US5.1 - Criar Evento 🟢 (P2)
Status: Pós-MVP (pode ser tratado como agendamento especial no MVP)

US5.2 - Integração Google Calendar 🟢 (P2)
Status: Pós-MVP

Resumo de Prioridades para MVP (1 semana)
PrioridadeEsforço (%)User Stories (USs)Must Have (P0)65%US1.1, US1.2 (Agendamento)<br>US2.1, US2.2 (Ponto)<br>US3.1, US3.2, US3.3 (Chaves)<br>Sistema de autenticação<br>Dashboard principalShould Have (P1)25%US1.3 (Cancelar Agendamento)<br>US2.3 (Relatório Ponto)<br>US4.1, US4.3 (Feed de Observações)Won't Have (P2)Pós-MVPUS1.4 (Editar)<br>US2.4 (Notificações)<br>US4.2 (Observações Direcionadas)<br>US5.1, US5.2 (Eventos/Google Calendar)

Épicos Técnicos (Não-Funcionais)
Epic: Autenticação e Autorização 🔴 (P0)

Login/logout com email Cesupa e senha
Gerenciamento via Firebase Auth

Epic: Infraestrutura 🔴 (P0)

Setup de database (Firebase)
API REST básica

Epic: UI/UX 🔴 (P0)

Design responsivo
Tema universitário clean
Feedback visual de ações
Loading states

Epic: Geolocalização 🟡 (P1)

Permissão de localização
Validação de raio (100m da instituição)
Fallback se GPS não disponível (MVP: admin pode aprovar manualmente)
