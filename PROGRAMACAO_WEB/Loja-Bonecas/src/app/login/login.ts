import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected email = '';
  protected senha = '';
  protected readonly enviado = signal(false);

  protected entrar(): void {
    this.enviado.set(true);
  }
}
