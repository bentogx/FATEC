import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  protected nome = '';
  protected email = '';
  protected dataNascimento = '';
  protected senha = '';
  protected readonly dataMaxima = (() => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    return hoje.toISOString().slice(0, 10);
  })();
  protected readonly enviado = signal(false);

  protected cadastrar(): void {
    this.enviado.set(true);
    this.nome = '';
    this.email = '';
    this.dataNascimento = '';
    this.senha = '';
  }
}
