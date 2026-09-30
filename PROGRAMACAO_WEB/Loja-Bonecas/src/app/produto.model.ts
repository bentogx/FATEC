export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: FotoProduto[];
  /** Quantidade disponível; sem valor significa estoque sem limite definido. */
  estoque?: number;
}

export interface FotoProduto {
  src: string;
  referencia?: boolean;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
