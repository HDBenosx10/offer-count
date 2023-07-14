# Balcão de Ofertas

## Descrição
Projeto feito para Eclipseworks, usando Nodejs.

### Jornada
Foi um projeto interessante de ser feito, apesar das regras de negocio simples, tentei aplicar meu conhecimento em arquitetura Hexagonal junto a inversão de controle, para construir uma aplicação com um dominio isolado, escalavel e adaptavel a mudança.
Priorizei toda a construção dessa estrutura de design de código, então talvez estejam faltando alguns comportamentos de fallback.
Não me preocupei com a assertividade referente a representação de cryptomoedas na aplicação, para os casos de uso requisitados não se fazia necessário, então optei não implementar para ganhar tempo.
### Melhorias para o futuro
- Melhorar tracking de errors
- Melhorar logs
- Possivel implementação de Open Telemetry(pode resolver os pontos anteriores)
- Escrever testes para alem do Dominio da aplicação
## Set Up
Deixei um .env pronto no projeto.

Para rodar será necessário o Docker, com ele instalado é só rodar na raiz do projeto:

- `yarn prisma:push`

- `yarn prisma:seed`

- `docker-compose up --build`

Nesse ponto se tudo correu bem o seu servidor estará rodando no:

 `localhost:8080`.

## 🚀 Techs used
- TypeScript
- Postgres
- NodeJS
- Yarn
- Prisma
- Express
- Jest
- Arquitetura Hexagonal (ports and adapters)
- IoC
- Tsyringe
- Docker & Docker-compose


# ![](https://cdn.discordapp.com/attachments/695442261877719050/836389514107682826/routes.png)Endpoints

**Criar Oferta**
----
  Cria uma oferta utilizando o payload

* **URL**

  /offers/create

* **Method:**

  `POST`

* **Data Params**

  ```json
  {
    "userId": "9a76d0d4-2c8d-448b-af55-1ffd9e51b9ba",
    "sellerWalletId": "38ce96e4-c641-4643-affe-8de5af3132b0",
    "tokenId": "1250baaf-f1df-4fd4-b009-0e78b044eba4",
    "amount": 1,
    "unitPrice": 1,
    "currency": "BRL"
  }

  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
      "_id": "af308258-c687-40be-b2a9-894886272c6c",
      "_sellerWalletId": "38ce96e4-c641-4643-affe-8de5af3132b0",
      "_tokenId": "1250baaf-f1df-4fd4-b009-0e78b044eba4",
      "_amount": 1,
      "_unitPrice": 1,
      "_currency": "BRL",
      "_expirationDate": 1689441985628,
      "_isActive": true
    }
    ```
---
**Deletar Oferta**
----
  Deleta oferta.

* **URL**

  /offers/delete

* **Method:**

  `DELETE`

* **Data Params**

  ```json
  {
    "userId": "9a76d0d4-2c8d-448b-af55-1ffd9e51b9ba",
    "offerId": "af308258-c687-40be-b2a9-894886272c6c"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />

----

**Listar Ofertas**
----
Convert currency amount.

* **URL**

  /offers?page=1&limit=10

* **Method:**

  `GET`

*  **QUERY Params**

   **Required:**

   `page=[number]`

   `limit=[number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
	    "pageCount": 1,
	    "offers": [
		    {
          "_id": "af308258-c687-40be-b2a9-894886272c6c",
          "_sellerWalletId": "38ce96e4-c641-4643-affe-8de5af3132b0",
          "_tokenId": "1250baaf-f1df-4fd4-b009-0e78b044eba4",
          "_amount": 1,
          "_unitPrice": 1,
          "_currency": "BRL",
          "_expirationDate": 1689441985628,
          "_isActive": true
        }
	    ]
    }
    ```
----
