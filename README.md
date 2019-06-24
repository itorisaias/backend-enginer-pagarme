# Desafio Backend Pagarme

Projeto para vaga de backend enginer na pagarme, desenvolvimento de um Payment Service Provider (PSP).

## Softwares necessarios

- [NodeJS](https://nodejs.com.br)
- [Git](https://git.com)
- [Docker](https://docker.com) (apenas se se for utilizar com ambiente de docker)

## Bibliotecas

- [express](https://expresjs.com) Servidor de aplicação
- [dotenv](https://expresjs.com) Carregamento de configurações
- [factory-girl](https://expresjs.com) Criar dados para teste
- [sequelize](https://expresjs.com) ORM
- [winston](https://expresjs.com)

## Como utilizar

Clone o projeto
```sh
git clone https://github.com/itorisaias/backend-enginer-pagarme.git
```

```sh
cd backend-enginer-pagarme
```

Carregamento de configurações de ambiente
```sh
cp .env.example .env
```

```sh
npm install
```

Aplicar migrates de banco
```sh
npm run migrate:latest
```

Criar dados na base
```sh
npm run seed
```

Reverter os migrates de banco
```sh
npm run migrate:rollback
```

Passar os testes
```sh
npm run test
```

Instalar dependencias
```sh
npm install
```

Subir aplicação
```sh
npm run dev
```

```sh
npm install --only=production
```

```sh
npm start
```

<!-- docker run --name some-postgres -e POSTGRES_PASSWORD=pg -d postgres -->
