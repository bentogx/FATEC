import { Injectable, afterNextRender, computed, signal } from '@angular/core';
import { ItemCarrinho, Produto } from '../produto.model';

const CHAVE_STORAGE = 'cherry-dolls-carrinho';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly _itens = signal<ItemCarrinho[]>([]);

  /** Lista de itens do carrinho (somente leitura para quem usa o serviço). */
  readonly itens = this._itens.asReadonly();

  /** Quantidade total de unidades (usada no numerinho do menu). */
  readonly quantidadeTotal = computed(() =>
    this._itens().reduce((soma, item) => soma + item.quantidade, 0),
  );

  /** Valor total: recalcula sozinho sempre que adiciona ou remove algo. */
  readonly total = computed(() => {
    const centavos = this._itens().reduce(
      (soma, item) => soma + Math.round(item.produto.preco * 100) * item.quantidade,
      0,
    );
    return centavos / 100;
  });

  constructor() {
    // Só roda no navegador (o localStorage não existe no servidor/SSR).
    afterNextRender(() => this.carregar());
  }

  adicionar(produto: Produto): boolean {
    let adicionado = false;
    this.atualizar((itens) => {
      const existente = itens.find((i) => i.produto.id === produto.id);
      if (existente) {
        if (produto.estoque !== undefined && existente.quantidade >= produto.estoque) return itens;
        adicionado = true;
        return itens.map((i) =>
          i.produto.id === produto.id ? { produto, quantidade: i.quantidade + 1 } : i,
        );
      }
      if (produto.estoque !== undefined && produto.estoque <= 0) return itens;
      adicionado = true;
      return [...itens, { produto, quantidade: 1 }];
    });
    return adicionado;
  }

  aumentar(id: number, limiteEstoque?: number): boolean {
    let aumentado = false;
    this.atualizar((itens) => itens.map((item) => {
      if (item.produto.id !== id) return item;
      const limite = item.produto.estoque ?? limiteEstoque;
      if (limite !== undefined && item.quantidade >= limite) return item;
      aumentado = true;
      return { ...item, quantidade: item.quantidade + 1 };
    }));
    return aumentado;
  }

  /** Diminui 1 unidade; se chegar a zero, o item sai do carrinho. */
  diminuir(id: number): void {
    this.atualizar((itens) =>
      itens
        .map((i) => (i.produto.id === id ? { ...i, quantidade: i.quantidade - 1 } : i))
        .filter((i) => i.quantidade > 0),
    );
  }

  /** Remove o produto inteiro (todas as unidades). */
  remover(id: number): void {
    this.atualizar((itens) => itens.filter((i) => i.produto.id !== id));
  }

  limpar(): void {
    this.atualizar(() => []);
  }

  private atualizar(fn: (itens: ItemCarrinho[]) => ItemCarrinho[]): void {
    this._itens.update(fn);
    this.salvar();
  }

  private salvar(): void {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(this._itens()));
    } catch {
      // storage indisponível (modo privado, etc.): o carrinho continua funcionando em memória
    }
  }

  private carregar(): void {
    try {
      const bruto = localStorage.getItem(CHAVE_STORAGE);
      if (!bruto) return;
      const dados: unknown = JSON.parse(bruto);
      if (!Array.isArray(dados)) return;

      const validos = dados.filter(
        (i): i is ItemCarrinho =>
          !!i &&
          typeof i.quantidade === 'number' &&
          i.quantidade > 0 &&
          !!i.produto &&
          typeof i.produto.id === 'number' &&
          typeof i.produto.preco === 'number',
      );
      this._itens.set(validos);
    } catch {
      // dados corrompidos: ignora e começa com carrinho vazio
    }
  }
}
