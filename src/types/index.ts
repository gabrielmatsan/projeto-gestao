import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  route?: string;
}

export interface Agendamento {
  id: string;
  titulo: string;
  responsavel: string;
  grupo: string;
  dataInicio: Date;
  dataFim: Date;
  criadoPor: string;
  criadoEm: Date;
}

export interface CriarAgendamentoInput {
  titulo: string;
  responsavel: string;
  grupo: string;
  dataInicio: Date;
  dataFim: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  nome: string;
}
