import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarrinhoService } from './carrinho/carrinho.service';
import { PesquisaService } from './pesquisa.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Matharazzo Dolls');
  protected readonly carrinho = inject(CarrinhoService);
  protected readonly pesquisa = inject(PesquisaService);
  private readonly router = inject(Router);
  protected readonly anoAtual = new Date().getFullYear();

  protected pesquisar(): void {
    void this.router.navigate(['/produtos']);
  }
}
