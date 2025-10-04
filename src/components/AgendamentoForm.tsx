import React, { useState } from 'react';
import { CriarAgendamentoInput } from '../types';

interface AgendamentoFormProps {
  onSubmit: (agendamento: CriarAgendamentoInput) => void;
  onCancel: () => void;
}

const AgendamentoForm: React.FC<AgendamentoFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CriarAgendamentoInput>({
    titulo: '',
    responsavel: '',
    grupo: '',
    dataInicio: new Date(),
    dataFim: new Date(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (name: 'dataInicio' | 'dataFim', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Responsável é obrigatório';
    }

    if (!formData.grupo.trim()) {
      newErrors.grupo = 'Grupo é obrigatório';
    }

    // Validar que data de início não está no passado
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dataInicioDate = new Date(formData.dataInicio);
    dataInicioDate.setHours(0, 0, 0, 0);

    if (dataInicioDate < now) {
      newErrors.dataInicio = 'Não é possível agendar no passado';
    }

    // Validar que data fim é depois da data início
    if (formData.dataFim <= formData.dataInicio) {
      newErrors.dataFim = 'Horário de término deve ser após o horário de início';
    }

    // Validar horário permitido: 7h às 22h
    const horaInicio = formData.dataInicio.getHours();
    const horaFim = formData.dataFim.getHours();

    if (horaInicio < 7 || horaInicio >= 22) {
      newErrors.dataInicio = 'Horário permitido: 7h às 22h';
    }

    if (horaFim < 7 || horaFim > 22 || (horaFim === 22 && formData.dataFim.getMinutes() > 0)) {
      newErrors.dataFim = 'Horário permitido: 7h às 22h';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const formatDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
          Título / Motivo *
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.titulo ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Reunião de projeto"
        />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>}
      </div>

      <div>
        <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700 mb-2">
          Responsável *
        </label>
        <input
          type="text"
          id="responsavel"
          name="responsavel"
          value={formData.responsavel}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.responsavel ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nome do responsável"
        />
        {errors.responsavel && <p className="mt-1 text-sm text-red-600">{errors.responsavel}</p>}
      </div>

      <div>
        <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-2">
          Grupo / Turma *
        </label>
        <input
          type="text"
          id="grupo"
          name="grupo"
          value={formData.grupo}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.grupo ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Grupo A, Turma 2024.1"
        />
        {errors.grupo && <p className="mt-1 text-sm text-red-600">{errors.grupo}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-2">
            Data e Hora de Início *
          </label>
          <input
            type="datetime-local"
            id="dataInicio"
            name="dataInicio"
            value={formatDateTimeLocal(formData.dataInicio)}
            onChange={(e) => handleDateChange('dataInicio', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dataInicio ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dataInicio && <p className="mt-1 text-sm text-red-600">{errors.dataInicio}</p>}
        </div>

        <div>
          <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-2">
            Data e Hora de Término *
          </label>
          <input
            type="datetime-local"
            id="dataFim"
            name="dataFim"
            value={formatDateTimeLocal(formData.dataFim)}
            onChange={(e) => handleDateChange('dataFim', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dataFim ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dataFim && <p className="mt-1 text-sm text-red-600">{errors.dataFim}</p>}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Horário permitido:</strong> 7h às 22h
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Criar Agendamento
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AgendamentoForm;
