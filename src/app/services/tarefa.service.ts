import { Service } from '@angular/core';
import { ITarefa } from '../models/tarefa.model';


@Service()
export class TarefaService {
  private tarefas: ITarefa[] = [];

  listar(): ITarefa[] {
    return [...this.tarefas];
  }

  buscarPorId(id: string): ITarefa | undefined {
    return this.tarefas.find((tarefa) => tarefa.id === id);
  }

  cadastrar(dados: Omit<ITarefa, 'id'>): ITarefa {
    const novaTarefa: ITarefa = {
      ...dados,
      id: this.gerarId()
    };
    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  atualizar(tarefaAtualizada: ITarefa): boolean {
    const indice = this.tarefas.findIndex((tarefa) => tarefa.id === tarefaAtualizada.id);
    if (indice === -1) return false;

    this.tarefas[indice] = { ...tarefaAtualizada };
    return true;
  }

  excluir(id: string): boolean {
    const quantidadeAntes = this.tarefas.length;
    this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
    return this.tarefas.length < quantidadeAntes;
  }

  private gerarId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }
}
