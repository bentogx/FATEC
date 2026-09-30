import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { FotoProduto, Produto } from '../produto.model';
import { PesquisaService } from '../pesquisa.service';

@Component({
  selector: 'app-produtos',
  imports: [CurrencyPipe],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {
  private readonly carrinho = inject(CarrinhoService);
  private readonly pesquisa = inject(PesquisaService);

  /** id do último produto adicionado (para mostrar "Adicionado ✓" por um instante). */
  protected readonly adicionadoId = signal<number | null>(null);
  protected readonly fotoSelecionada = signal<Record<number, number>>({});
  protected readonly produtoDetalhado = signal<Produto | null>(null);
  protected readonly avisoEstoqueId = signal<number | null>(null);

  protected readonly produtos: Produto[] = [
    {
      id: 1,
      nome: 'Boneca Barbie Sweetie',
      descricao: 'Boneca Completa, com todos os acessorios, nao tem detalhes.', 
      preco: 189.9,
      estoque: 2,
      imagens: [
        { src: '/produtos/Barbie-Sweetie.jpeg' },
        { src: '/produtos/Ref-Barbie-Sweetie.jpg', referencia: true },
      ],
    },
    {
      id: 2,
      nome: 'Boneco Ken AA Happy Family',
      descricao: 'Boneco Ken Allan Happy Family AA (Afro-Americana). Somente o boneco, nao contem acessorios. (Raro) ',
      preco: 130.0,
      estoque: 1,
      imagens: [
        { src: '/produtos/Boneco-Ken.jpeg'},
        { src: '/produtos/Ref-Boneco-Ken.jpeg', referencia: true },
      ],
    },
    {
      id: 3,
      nome: 'Barbie Grace AA S.I.S',
      descricao: 'Barbie So In Style AA, somente boneca. Contem um detalhe no pescoço.',
      preco: 64.5,
      estoque: 1,
      imagens: [
        { src: '/produtos/Barbie-Magia.jpeg' },
        { src: '/produtos/Detalhe-BarbieMagia.jpeg'},
        { src: '/produtos/Ref-Barbie-Magia.jpeg', referencia: true },
      ],
    },
    {
      id: 4,
      nome: 'Monster High Cleo Picture Day',
      descricao: 'Monster High CLeo Picture Day. Boneca vai como nas fotos. Esta faltando uma maozinha.',
      preco: 90.0,
      estoque: 1,
      imagens: [
        { src: '/produtos/CleoPic.jpeg' },
        { src: '/produtos/Ref-CleoPic.webp', referencia: true },
      ],
    },
    {
      id: 5,
      nome: 'Monster High Frankie 13 Wishes',
      descricao: 'Monster High Frankie 13 Wishes. Boneca vai como nas fotos. Não tem nenhum detalhe.',
      preco: 110.0,
      estoque: 1,
      imagens: [
        { src: '/produtos/Frankie-wish.jpeg' },
        { src: '/produtos/Ref-Frankie.jpg', referencia: true },
      ],
    },






  ];

  protected readonly produtosFiltrados = computed(() => {
    const termo = this.pesquisa.termo().trim().toLocaleLowerCase('pt-BR');
    if (!termo) return this.produtos;
    return this.produtos.filter((produto) =>
      `${produto.nome} ${produto.descricao}`.toLocaleLowerCase('pt-BR').includes(termo),
    );
  });

  protected indiceFoto(produto: Produto): number {
    return this.fotoSelecionada()[produto.id] ?? 0;
  }

  protected fotoAtual(produto: Produto): FotoProduto | undefined {
    return produto.imagens[this.indiceFoto(produto)];
  }

  protected selecionarFoto(produto: Produto, indice: number): void {
    this.fotoSelecionada.update((selecionadas) => ({ ...selecionadas, [produto.id]: indice }));
  }

  protected navegarFotos(produto: Produto, direcao: -1 | 1): void {
    const quantidade = produto.imagens.length;
    if (quantidade < 2) return;
    this.selecionarFoto(produto, (this.indiceFoto(produto) + direcao + quantidade) % quantidade);
  }

  protected abrirDetalhes(produto: Produto): void {
    this.produtoDetalhado.set(produto);
  }

  protected fecharDetalhes(): void {
    this.produtoDetalhado.set(null);
  }

  protected adicionar(produto: Produto): void {
    if (!this.carrinho.adicionar(produto)) {
      this.avisoEstoqueId.set(produto.id);
      return;
    }
    this.avisoEstoqueId.set(null);
    this.adicionadoId.set(produto.id);
    setTimeout(() => {
      if (this.adicionadoId() === produto.id) this.adicionadoId.set(null);
    }, 1200);
  }

  protected estoqueRestante(produto: Produto): number | undefined {
    if (produto.estoque === undefined) return undefined;
    const noCarrinho = this.carrinho.itens().find((item) => item.produto.id === produto.id)?.quantidade ?? 0;
    return Math.max(0, produto.estoque - noCarrinho);
  }

  protected podeAdicionar(produto: Produto): boolean {
    const restante = this.estoqueRestante(produto);
    return restante === undefined || restante > 0;
  }
}
