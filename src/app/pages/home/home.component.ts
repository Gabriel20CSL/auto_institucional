import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { ITarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-heading">
      <div>
        <p class="eyebrow">SEU DIA, MAIS ORGANIZADO</p>
        <h1>Minhas tarefas</h1>
        <p class="subtitle">Acompanhe suas atividades e mantenha tudo em dia.</p>
      </div>
      <a routerLink="/tarefa-nova" class="btn btn-primary add-button"><i class="bi bi-plus-lg"></i> Adicionar tarefa</a>
    </section>

    <section class="summary-row">
      <div class="summary-card"><span class="summary-icon blue"><i class="bi bi-list-check"></i></span><div><strong>{{ tarefas.length }}</strong><small>Tarefas cadastradas</small></div></div>
      <div class="summary-card"><span class="summary-icon orange"><i class="bi bi-flag"></i></span><div><strong>{{ contarPrioridade('Alta') }}</strong><small>Prioridade alta</small></div></div>
      <div class="summary-card"><span class="summary-icon green"><i class="bi bi-briefcase"></i></span><div><strong>{{ contarCategoria('Trabalho') }}</strong><small>De trabalho</small></div></div>
    </section>

    <section class="list-section">
      <div class="section-title"><div><h2>Suas atividades</h2><p>Gerencie suas tarefas cadastradas.</p></div><span class="task-count">{{ tarefas.length }} {{ tarefas.length === 1 ? 'tarefa' : 'tarefas' }}</span></div>

      <div *ngIf="tarefas.length === 0" class="empty-state">
        <div class="empty-icon"><i class="bi bi-clipboard-check"></i></div>
        <h3>Nenhuma tarefa por aqui</h3>
        <p>Comece adicionando sua primeira tarefa.</p>
        <a routerLink="/tarefa-nova" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Criar primeira tarefa</a>
      </div>

      <div class="task-grid" *ngIf="tarefas.length > 0">
        <article class="task-card" *ngFor="let tarefa of tarefas">
          <div class="task-card-top">
            <span class="category-tag" [ngClass]="classeCategoria(tarefa.categoria)">{{ tarefa.categoria }}</span>
            <span class="priority-tag" [ngClass]="classePrioridade(tarefa.prioridade)"><span class="priority-dot"></span>{{ tarefa.prioridade }}</span>
          </div>
          <h3>{{ tarefa.nome }}</h3>
          <div class="task-date"><i class="bi bi-calendar-event"></i> Prazo: {{ tarefa.data | date:'dd/MM/yyyy':'':'pt-BR' }}</div>
          <div class="task-actions">
            <a class="btn btn-outline-primary btn-sm" [routerLink]="['/tarefa-atualiza', tarefa.id]"><i class="bi bi-pencil-square"></i> Editar</a>
            <button class="btn btn-outline-danger btn-sm" type="button" (click)="deletar(tarefa)"><i class="bi bi-trash3"></i> Deletar</button>
          </div>
        </article>
      </div>
    </section>
  `
})
export class HomeComponent {
  private tarefaService = inject(TarefaService);
  tarefas: ITarefa[] = this.tarefaService.listar();

  atualizarLista(): void { this.tarefas = this.tarefaService.listar(); }

  deletar(tarefa: ITarefa): void {
    if (confirm(`Deseja realmente excluir a tarefa "${tarefa.nome}"?`)) {
      this.tarefaService.excluir(tarefa.id);
      this.atualizarLista();
    }
  }

  contarPrioridade(prioridade: string): number { return this.tarefas.filter(t => t.prioridade === prioridade).length; }
  contarCategoria(categoria: string): number { return this.tarefas.filter(t => t.categoria.toLowerCase() === categoria.toLowerCase()).length; }
  classePrioridade(prioridade: string): string { return prioridade.toLowerCase(); }
  classeCategoria(categoria: string): string { return categoria.toLowerCase(); }
}
