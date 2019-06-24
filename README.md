# Desafio Backend Pagarme

Projeto para vaga de backend enginer na pagarme, desenvolvimento de um Payment Service Provider (PSP).

## Softwares necessarios

- [Nodejs && NPM](https://nodejs.org)
- [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)

## Configuração do projeto

Primeiro é ncessário clone o projeto
```sh
git clone https://github.com/itorisaias/backend-enginer-pagarme.git
```

Entre na pasta do projeto
```sh
cd backend-enginer-pagarme
```

Instale as dependências do projeto
```sh
npm install
```

Carregamento de configurações de ambiente, crie um arquivo `.env` na raiz do projeto, você pode encontrar um exemplo na raiz do projeto `.env.example`, lembre-se de colocar suas configurações, este é apenas um modelo do que o projeto precisa.
```sh
cp .env.example .env
```

## Carregar ambiente de desenvolvimento

Antes de subir o ambiente em desenvovimento garanta que as configurações do `.env` esteja correta.

Aplique as migrates de banco
```sh
npm run migrate:latest
```

Criar dados defaults para teste
```sh
npm run seed
```

Subir a aplicação local
```sh
npm run dev
```

E acesse `https://localhost:<PORT>/api-docs` irá abrir a documentação da aplicação.

Os usuario defaults para teste que foram criados, podem ser encontrado em `./src/database/seeders/20190621051522-client.js`

## Carregar ambiente de produção

Inicializar aplicação
```sh
npm start
```

## Executar testes unitários e de integrações

Para executar os teste execute
```sh
npm run test
```

## Bibliotecas utilizadas

- [**express**](https://github.com/expressjs) Framework de aplicativo web para o Node.js
- [**dotenv**](https://github.com/motdotla/dotenv) Dotenv é um módulo de dependência que carrega variáveis ​​de ambiente de um arquivo .env em process.env.
- [**factory-girl**](https://github.com/aexmachina/factory-girl#readme) factory-girl é uma biblioteca de fábrica para o Node.js. Trabalha de forma assíncrona e suporta associações e o uso de funções para gerar atributos.
- [**sequelize**](http://docs.sequelizejs.com/) Sequelize é um ORM baseado em promessa para o Node.js.
- [**winston**](https://github.com/winstonjs/winston#readme)
- [**morgan**](https://github.com/expressjs/morgan) Middleware de logger de solicitação de HTTP para node.js
- [**moment**](https://moment.com) O Moment.js é um pacote open source que pode ser utilizado para validar, manipular e fazer o parse de datas no JavaScript.
