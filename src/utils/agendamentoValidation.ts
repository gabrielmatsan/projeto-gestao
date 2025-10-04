import { Agendamento, CriarAgendamentoInput } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Verifica se há conflito de horário entre o novo agendamento e os existentes
 */
export const verificarConflitosHorario = (
  novoAgendamento: CriarAgendamentoInput,
  agendamentosExistentes: Agendamento[]
): boolean => {
  return agendamentosExistentes.some((agendamento) => {
    const inicioExistente = new Date(agendamento.dataInicio);
    const fimExistente = new Date(agendamento.dataFim);
    const novoInicio = new Date(novoAgendamento.dataInicio);
    const novoFim = new Date(novoAgendamento.dataFim);

    // Verifica se há sobreposição de horários
    return (
      (novoInicio >= inicioExistente && novoInicio < fimExistente) ||
      (novoFim > inicioExistente && novoFim <= fimExistente) ||
      (novoInicio <= inicioExistente && novoFim >= fimExistente)
    );
  });
};

/**
 * Valida se o horário está dentro do período permitido (7h às 22h)
 */
export const validarHorarioPermitido = (data: Date): boolean => {
  const hora = data.getHours();
  const minutos = data.getMinutes();

  // Horário deve ser >= 7h e < 22h
  // Se for exatamente 22h, os minutos devem ser 0
  if (hora < 7 || hora > 22) {
    return false;
  }

  if (hora === 22 && minutos > 0) {
    return false;
  }

  return true;
};

/**
 * Valida se a data não está no passado
 */
export const validarDataFutura = (data: Date): boolean => {
  const agora = new Date();
  return data >= agora;
};

/**
 * Valida se a data de fim é posterior à data de início
 */
export const validarOrdemDatas = (inicio: Date, fim: Date): boolean => {
  return fim > inicio;
};

/**
 * Valida um agendamento completo
 */
export const validarAgendamento = (
  agendamento: CriarAgendamentoInput,
  agendamentosExistentes: Agendamento[] = []
): ValidationError[] => {
  const erros: ValidationError[] = [];

  // Validar campos obrigatórios
  if (!agendamento.titulo.trim()) {
    erros.push({ field: 'titulo', message: 'Título é obrigatório' });
  }

  if (!agendamento.responsavel.trim()) {
    erros.push({ field: 'responsavel', message: 'Responsável é obrigatório' });
  }

  if (!agendamento.grupo.trim()) {
    erros.push({ field: 'grupo', message: 'Grupo é obrigatório' });
  }

  // Validar datas
  const dataInicio = new Date(agendamento.dataInicio);
  const dataFim = new Date(agendamento.dataFim);

  if (!validarDataFutura(dataInicio)) {
    erros.push({ field: 'dataInicio', message: 'Não é possível agendar no passado' });
  }

  if (!validarOrdemDatas(dataInicio, dataFim)) {
    erros.push({ field: 'dataFim', message: 'Horário de término deve ser após o horário de início' });
  }

  if (!validarHorarioPermitido(dataInicio)) {
    erros.push({ field: 'dataInicio', message: 'Horário permitido: 7h às 22h' });
  }

  if (!validarHorarioPermitido(dataFim)) {
    erros.push({ field: 'dataFim', message: 'Horário permitido: 7h às 22h' });
  }

  // Verificar conflitos de horário
  if (erros.length === 0 && verificarConflitosHorario(agendamento, agendamentosExistentes)) {
    erros.push({
      field: 'dataInicio',
      message: 'Já existe um agendamento neste horário'
    });
  }

  return erros;
};

/**
 * Formata uma data para exibição (DD/MM/YYYY HH:mm)
 */
export const formatarDataHora = (data: Date): string => {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, '0');
  const minuto = String(d.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};

/**
 * Calcula a duração do agendamento em horas
 */
export const calcularDuracao = (inicio: Date, fim: Date): number => {
  const diff = new Date(fim).getTime() - new Date(inicio).getTime();
  return Math.round(diff / (1000 * 60 * 60) * 10) / 10; // Arredonda para 1 casa decimal
};
