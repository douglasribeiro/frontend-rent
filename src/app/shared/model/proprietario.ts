import { EstadoCivil } from "../enums/estadoCivil";
import { Cliente } from "./cliente";
import { Endereco } from "./endereco";
import { Imovel } from "./imovel";

export interface Proprietario{

    id: Number,
    nome: String,
    cpf: String,
    ident: String,
    dtNasc: Date,
    email: String,
    estCivil: EstadoCivil,
    naturalidade: String,
    nacionalidade: String,
    conjuge: String,
    cpfConjuge: String,
    dtnConjuge: Date,
    cliente: Cliente,
    endereco: Endereco[],
    imovel: Imovel[]
}
