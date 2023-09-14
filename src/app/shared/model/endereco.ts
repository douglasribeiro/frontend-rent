import { Cidade } from "./cidade";

export interface Endereco {

  id: Number,
  cep: String,
  logradouro: String,
  numero: String,
  pontoRef: String,
  bairro: String,
  cidade: Cidade

}
