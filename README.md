# Lista de Tarefas — Angular 22

Projeto da atividade prática de Desenvolvimento Web Front-End (FUMEC), organizado conforme o PDF fornecido.

## Requisitos

- Node.js compatível com Angular 22: `^22.22.3` ou `^24.15.0` (consulte https://angular.dev/reference/versions).
- npm instalado.

> O Angular 22 exige uma versão mais recente do Node 22 do que a 22.16.0. Se seu computador ainda estiver com Node 22.16.0, atualize o Node antes de instalar as dependências.

## Como executar no VS Code

1. Extraia o ZIP.
2. Abra a pasta `lista-tarefas-angular22` no VS Code.
3. Confira se o terminal está dentro da pasta `lista-tarefas-angular22` (a pasta que contém `package.json` e `angular.json`). Se estiver em outra pasta, entre nela com `cd lista-tarefas-angular22`.
4. Abra o terminal integrado (Terminal → Novo Terminal).
5. Confira as versões:

   ```bash
   node -v
   npm -v
   ```

6. Instale as dependências:

   ```bash
   npm install
   ```

7. Inicie a aplicação:

   ```bash
   npm start
   ```

8. A aplicação será aberta em `http://localhost:4200`.

## Estrutura principal

```text
src/
├── app/
│   ├── components/
│   │   └── header/
│   ├── models/
│   │   └── tarefa.model.ts
│   ├── pages/
│   │   ├── home/
│   │   ├── tarefa-nova/
│   │   └── tarefa-atualiza/
│   ├── services/
│   │   └── tarefa.service.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.css
```

## Implementação do service no Angular 22

O PDF descreve a classe `TarefaService` com injeção de dependência via `@Injectable`. Como solicitado, este projeto usa o novo decorator `@Service()` disponibilizado no Angular 22:

```typescript
import { Service } from '@angular/core';

@Service()
export class TarefaService {
  private tarefas: ITarefa[] = [];
}
```

A classe implementa `listar`, `buscarPorId`, `cadastrar`, `atualizar` e `excluir`. O armazenamento é feito em memória por `Array<ITarefa>`, conforme a atividade; por isso, os registros são reiniciados quando a aplicação é recarregada.

Os arquivos Bootstrap e Bootstrap Icons são carregados pela propriedade `styles` de `angular.json`. Não adicione `@import "node_modules/..."` em `src/styles.css`.

## Funcionalidades

- Listar tarefas com `*ngFor`.
- Cadastrar tarefa com `ngModel` e two-way data binding.
- Selecionar categoria Doméstico, Pessoal ou Trabalho por botões.
- Editar tarefa existente.
- Excluir tarefa com confirmação.
- Navegar entre as páginas com Angular Router.
- Cabeçalho compartilhado com data atual.
- Interface responsiva com Bootstrap e Bootstrap Icons.
