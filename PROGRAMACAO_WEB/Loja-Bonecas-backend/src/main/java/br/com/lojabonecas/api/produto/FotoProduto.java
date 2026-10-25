package br.com.lojabonecas.api.produto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class FotoProduto {
    @Column(name = "src", nullable = false, length = 500)
    private String src;
    @Column(name = "referencia", nullable = false)
    private boolean referencia = false;

    public FotoProduto() {}
    public String getSrc() { return src; }
    public void setSrc(String src) { this.src = src; }
    public boolean isReferencia() { return referencia; }
    public void setReferencia(boolean referencia) { this.referencia = referencia; }
}
