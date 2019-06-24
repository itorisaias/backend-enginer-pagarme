const { gql } = require('apollo-server-express')

module.exports = gql`
type Client {
  id: ID!
  name: String
  email: String
  apiKey: String
  transactions: [Transaction]
  createdAt: String
  updatedAt: String
}

type Payable {
  id: ID!
  status: String
  paymentDate: String
  fee: String
  createdAt: String
  updatedAt: String
}

type Transaction {
  id: ID!
  amount: String
  cardNumber: String
  cardHolderName: String
  cardExpirationDate: String
  cardCvv: String
  paymentMethod: String
  descriptionTransaction: String
  payables: [Payable]
  createdAt: String
  updatedAt: String
}

type Query {
  transactions: [Transaction]
  payables: [Payable]
  clients: [Client]
}

input ClientInput {
  name: String
  email: String
}

input TransactionInput {
  amount: String
  cardNumber: String
  cardHolderName: String
  cardExpirationDate: String
  cardCvv: String
  paymentMethod: String
  descriptionTransaction: String
}

type Mutation {
  createClient (input: ClientInput): Client
  createTransaction (input: TransactionInput): Transaction
}
`
