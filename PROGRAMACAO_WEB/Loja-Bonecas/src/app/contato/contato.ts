import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  protected nome = '';
  protected email = '';
  protected mensagem = '';
  protected readonly enviado = signal(false);

  enviar(): void {
    // Envio real de formulário (API/e-mail) pode ser plugado aqui depois.
    this.enviado.set(true);
    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}
