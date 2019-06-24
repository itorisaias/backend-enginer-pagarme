# Desafio Backend Pagarme

Projeto para vaga de backend enginer na pagarme, desenvolvimento de um Payment Service Provider (PSP).

## Softwares necessarios

- [NodeJS](https://nodejs.com.br)
- [Git](https://git.com)
- [Docker](https://docker.com) (apenas se se for utilizar com ambiente em container)

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

Carregamento de configurações de ambiente
```sh
cp .env.example .env
```

## Desenvolvimento

Antes de subir o ambiente em desenvovimento garanta que as configurações do `.env` está correta.

Aplique as migrates de banco
```sh
npm run migrate:latest
```

Criar dados basico para
```sh
npm run seed
```

Caso queira reverter as migrates do banco
```sh
npm run migrate:rollback
```

Subir a aplicação local
```sh
npm run dev
```

## Executar testes unitários e de integrações

Para executar os teste execute
```sh
npm run test
```

## Estrutura do projeto

  - `/src/config` -
  - `/src/controllers` -
  - `/src/database` -
  - `/src/helpers` -
  - `/src/middlewares` -
  - `/src/routes` -
  - `/src/services` -
  - `/src/utils` -

## Bibliotecas utilizadas

- [express](https://expresjs.com) Framework de aplicativo web para o Node.js
- [dotenv](https://expresjs.com) Dotenv é um módulo de dependência que carrega variáveis ​​de ambiente de um arquivo .env em process.env.
- [factory-girl](https://expresjs.com) Criar dados para teste
- [sequelize](https://expresjs.com) Sequelize é um ORM baseado em promessa para o Node.js.
- [winston](https://expresjs.com)
- [morgan](https://expresjs.com) Middleware de logger de solicitação de HTTP para node.js
- [moment](https://expresjs.com) O Moment.js é um pacote open source que pode ser utilizado para validar, manipular e fazer o parse de datas no JavaScript.
