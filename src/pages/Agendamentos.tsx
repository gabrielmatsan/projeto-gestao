import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import AgendamentoForm from '../components/AgendamentoForm';
import { Agendamento, CriarAgendamentoInput } from '../types';
import { validarAgendamento, formatarDataHora, calcularDuracao } from '../utils/agendamentoValidation';

const Agendamentos: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCriarAgendamento = (input: CriarAgendamentoInput) => {
    // Validar agendamento
    const erros = validarAgendamento(input, agendamentos);

    if (erros.length > 0) {
      setError(erros.map(e => e.message).join(', '));
      return;
    }

    // Criar novo agendamento
    const novoAgendamento: Agendamento = {
      id: `agend-${Date.now()}`,
      ...input,
      criadoPor: 'Usuário Atual', // TODO: Pegar do sistema de autenticação
      criadoEm: new Date(),
    };

    setAgendamentos([...agendamentos, novoAgendamento]);
    setShowForm(false);
    setSuccess('Agendamento criado com sucesso!');
    setError(null);

    // Limpar mensagem de sucesso após 3 segundos
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleCancelar = () => {
    setShowForm(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
                <p className="text-sm text-gray-600">Gerencie os agendamentos da sala</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Agendamento
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensagens de feedback */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess(null)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Formulário de criação */}
        {showForm && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Criar Novo Agendamento</h2>
            <AgendamentoForm onSubmit={handleCriarAgendamento} onCancel={handleCancelar} />
          </div>
        )}

        {/* Lista de agendamentos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Próximos Agendamentos ({agendamentos.length})
            </h2>
          </div>

          {agendamentos.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Nenhum agendamento ainda</p>
              <p className="text-gray-400 text-sm">
                Clique em "Novo Agendamento" para criar o primeiro
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {agendamentos
                .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())
                .map((agendamento) => (
                  <div key={agendamento.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {agendamento.titulo}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Responsável:</span> {agendamento.responsavel}
                          </p>
                          <p>
                            <span className="font-medium">Grupo:</span> {agendamento.grupo}
                          </p>
                          <p>
                            <span className="font-medium">Início:</span>{' '}
                            {formatarDataHora(agendamento.dataInicio)}
                          </p>
                          <p>
                            <span className="font-medium">Término:</span>{' '}
                            {formatarDataHora(agendamento.dataFim)}
                          </p>
                          <p>
                            <span className="font-medium">Duração:</span>{' '}
                            {calcularDuracao(agendamento.dataInicio, agendamento.dataFim)}h
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Confirmado
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Agendamentos;
