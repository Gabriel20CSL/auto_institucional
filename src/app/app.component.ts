import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="container app-container">
      <router-outlet></router-outlet>
    </main>
    <footer class="app-footer">Lista de Tarefas · Atividade prática de Desenvolvimento Web Front-End</footer>
  `
})
export class AppComponent {}
