export interface ITarefa {
  id: string;
  nome: string;
  data: string;
  prioridade: string;
  categoria: string;
}

export function createITarefa(): ITarefa {
  return {
    id: '',
    nome: '',
    data: '',
    categoria: '',
    prioridade: 'Média'
  };
}
