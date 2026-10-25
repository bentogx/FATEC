# Loja de Bonecas — Backend

API REST em Java 17 e Spring Boot, separada do projeto front Angular.

## Executar

Com Maven instalado, rode `mvn spring-boot:run` nesta pasta. A API inicia em `http://localhost:8081`.

## Produtos

- `GET /api/produtos` — lista produtos
- `GET /api/produtos/{id}` — busca um produto
- `POST /api/produtos` — cadastra
- `PUT /api/produtos/{id}` — atualiza
- `DELETE /api/produtos/{id}` — exclui

O formato corresponde ao modelo do Angular (`Produto`: id, nome, descricao, preco, imagens e estoque). Veja `exemplo-produto.json` para um cadastro.

Os caminhos de imagem apontam para arquivos do front; os arquivos permanecem no projeto Angular. O banco H2 persiste em `./data`. O console de desenvolvimento fica em `http://localhost:8081/h2-console` (JDBC URL `jdbc:h2:file:./data/loja-bonecas`, usuário `sa`, senha em branco).

O front poderá buscar os produtos nessa API, mas ainda precisa trocar sua lista fixa por um serviço Angular com `HttpClient`. Cadastro/login não foram incluídos nesta primeira versão.
