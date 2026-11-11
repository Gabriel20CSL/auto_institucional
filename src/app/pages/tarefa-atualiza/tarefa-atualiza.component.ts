import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-atualiza',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="form-page">
      <a routerLink="/" class="back-link"><i class="bi bi-arrow-left"></i> Voltar para tarefas</a>
      <div class="form-heading"><span class="form-heading-icon edit"><i class="bi bi-pencil-square"></i></span><div><p class="eyebrow">ATUALIZAR ATIVIDADE</p><h1>Editar tarefa</h1><p class="subtitle">Altere as informações da tarefa selecionada.</p></div></div>
      <div *ngIf="!tarefa" class="alert alert-warning">Tarefa não encontrada. <a routerLink="/">Voltar para a página inicial.</a></div>
      <form *ngIf="tarefa" class="task-form" (ngSubmit)="atualizar()" #formTarefa="ngForm">
        <div class="mb-4"><label for="nome" class="form-label">Nome da tarefa <span class="required">*</span></label><input id="nome" name="nome" type="text" class="form-control" [(ngModel)]="tarefa.nome" required maxlength="100"></div>
        <div class="row g-3 mb-4">
          <div class="col-md-6"><label for="prioridade" class="form-label">Prioridade <span class="required">*</span></label><select id="prioridade" name="prioridade" class="form-select" [(ngModel)]="tarefa.prioridade" required><option value="Baixa">Baixa</option><option value="Média">Média</option><option value="Alta">Alta</option></select></div>
          <div class="col-md-6"><label for="data" class="form-label">Data limite <span class="required">*</span></label><input id="data" name="data" type="date" class="form-control" [(ngModel)]="tarefa.data" required></div>
        </div>
        <div class="mb-4"><label class="form-label">Categoria <span class="required">*</span></label><div class="category-options"><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Doméstico'" (click)="selecionarCategoria('Doméstico')"><i class="bi bi-house"></i> Doméstico</button><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Pessoal'" (click)="selecionarCategoria('Pessoal')"><i class="bi bi-person"></i> Pessoal</button><button type="button" class="category-choice" [class.selected]="tarefa.categoria === 'Trabalho'" (click)="selecionarCategoria('Trabalho')"><i class="bi bi-briefcase"></i> Trabalho</button></div><input type="hidden" name="categoria" [(ngModel)]="tarefa.categoria" required></div>
        <div class="form-actions"><a routerLink="/" class="btn btn-light">Cancelar</a><button type="submit" class="btn btn-primary" [disabled]="!formTarefa.valid || !tarefa.categoria"><i class="bi bi-check-lg"></i> Atualizar tarefa</button></div>
      </form>
    </div>
  `
})
export class TarefaAtualizaComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  tarefa: ITarefa | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const encontrada = this.tarefaService.buscarPorId(id);
      this.tarefa = encontrada ? { ...encontrada } : null;
    }
  }

  selecionarCategoria(categoria: string): void { if (this.tarefa) this.tarefa.categoria = categoria; }

  atualizar(): void {
    if (!this.tarefa || !this.tarefa.nome.trim() || !this.tarefa.data || !this.tarefa.categoria) return;
    this.tarefaService.atualizar({ ...this.tarefa, nome: this.tarefa.nome.trim() });
    this.router.navigate(['/']);
  }
}
