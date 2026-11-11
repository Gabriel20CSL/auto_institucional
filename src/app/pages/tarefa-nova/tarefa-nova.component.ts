import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createITarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-nova',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="form-page">
      <a routerLink="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar para tarefas</a>
      <div class="form-heading"><span class="form-heading-icon"><i class="bi bi-plus-circle"></i></span><div><p class="eyebrow">NOVA ATIVIDADE</p><h1>Adicionar tarefa</h1><p class="subtitle">Preencha os dados para cadastrar uma nova tarefa.</p></div></div>
      <form class="task-form" (ngSubmit)="salvar()" #formTarefa="ngForm">
        <div class="mb-4"><label for="nome" class="form-label">Nome da tarefa <span class="required">*</span></label><input id="nome" name="nome" type="text" class="form-control" placeholder="Ex.: Entregar atividade de Front-End" [(ngModel)]="tarefa.nome" required maxlength="100"></div>
        <div class="row g-3 mb-4">
          <div class="col-md-6"><label for="prioridade" class="form-label">Prioridade <span class="required">*</span></label><select id="prioridade" name="prioridade" class="form-select" [(ngModel)]="tarefa.prioridade" required><option value="Baixa">Baixa</option><option value="Média">Média</option><option value="Alta">Alta</option></select></div>
          <div class="col-md-6"><label for="data" class="form-label">Data limite <span class="required">*</span></label><input id="data" name="data" type="date" class="form-control" [(ngModel)]="tarefa.data" [min]="dataMinima" required></div>
        </div>
        <div class="mb-4"><label class="form-label">Categoria <span class="required">*</span></label><div class="category-options"><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Doméstico'" (click)="selecionarCategoria('Doméstico')"><i class="bi bi-house"></i> Doméstico</button><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Pessoal'" (click)="selecionarCategoria('Pessoal')"><i class="bi bi-person"></i> Pessoal</button><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Trabalho'" (click)="selecionarCategoria('Trabalho')"><i class="bi bi-briefcase"></i> Trabalho</button></div><input type="hidden" name="categoria" [(ngModel)]="tarefa.categoria" required><small class="form-hint">Escolha uma das categorias acima.</small></div>
        <div class="form-actions"><a routerLink="/" class="btn btn-light">Cancelar</a><button type="submit" class="btn btn-primary" [disabled]="!formTarefa.valid || !tarefa.categoria"><i class="bi bi-check-lg"></i> Salvar tarefa</button></div>
      </form>
    </div>
  `
})
export class TarefaNovaComponent {
  private tarefaService = inject(TarefaService);
  private router = inject(Router);
  tarefa = createITarefa();
  dataMinima = new Date().toISOString().slice(0, 10);

  selecionarCategoria(categoria: string): void { this.tarefa.categoria = categoria; }

  salvar(): void {
    if (!this.tarefa.nome.trim() || !this.tarefa.data || !this.tarefa.categoria) return;
    const { nome, data, prioridade, categoria } = this.tarefa;
    this.tarefaService.cadastrar({ nome: nome.trim(), data, prioridade, categoria });
    this.router.navigate(['/']);
  }
}
