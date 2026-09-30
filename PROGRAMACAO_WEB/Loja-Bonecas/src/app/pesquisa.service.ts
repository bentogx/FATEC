import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PesquisaService {
  readonly termo = signal('');

  atualizar(valor: string): void {
    this.termo.set(valor);
  }
}
