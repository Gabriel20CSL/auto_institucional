import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TarefaNovaComponent } from './pages/tarefa-nova/tarefa-nova.component';
import { TarefaAtualizaComponent } from './pages/tarefa-atualiza/tarefa-atualiza.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Minhas tarefas' },
  { path: 'tarefa-nova', component: TarefaNovaComponent, title: 'Nova tarefa' },
  { path: 'tarefa-atualiza/:id', component: TarefaAtualizaComponent, title: 'Editar tarefa' },
  { path: '**', redirectTo: '' }
];
