import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <header class="topbar">
      <div class="container topbar-content">
        <a class="brand" routerLink="/">
          <span class="brand-icon"><i class="bi bi-check2-square"></i></span>
          <span>Organiza<span class="brand-light">+ </span></span>
        </a>
        <div class="today"><i class="bi bi-calendar3"></i><span>{{ hoje | date:'EEEE, dd/MM/yyyy':'':'pt-BR' }}</span></div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  hoje = new Date();
}
