import { TipoEndereco } from "../enums/tipoEndereco";
import { Cidade } from "./cidade";
import { Proprietario } from "./proprietario";

export interface Endereco {

  id: Number,
  cep: String,
  logradouro: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: Cidade,
  tipoEndereco: TipoEndereco

}
