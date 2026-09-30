import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  protected readonly carrinho = inject(CarrinhoService);
  protected readonly compraFinalizada = signal(false);

  finalizar(): void {
    // Simulação: aqui você poderia enviar o pedido para uma API/pagamento.
    this.carrinho.limpar();
    this.compraFinalizada.set(true);
  }
}
