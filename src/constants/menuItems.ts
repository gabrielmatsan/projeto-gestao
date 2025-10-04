import { MenuItem } from '../types';
import { Key, Calendar, FileText, Clock } from 'lucide-react';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Assinatura de Chave',
    description: 'Pegou a chave',
    icon: Key,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Agendamento',
    description: 'Calendário e integração Google',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'Observações RTC',
    description: 'Registro de observações',
    icon: FileText,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Bate Ponto',
    description: 'Controle de ponto',
    icon: Clock,
    color: 'bg-orange-500',
  },
];
