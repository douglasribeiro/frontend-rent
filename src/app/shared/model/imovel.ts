import { TipoEdificacao } from "../enums/tipoEdificacao";
import { TipoImovel } from "../enums/tipoImovel";
import { TipoServico } from "../enums/tipoServico";
import { Cidade } from "./cidade";
import { Cliente } from "./cliente";
import { Proprietario } from "./proprietario";

export interface Imovel{
  [x: string]: any;
  id : number,
  proprietarioMaster: String,
  logradouro: String,
  condominio: String,
  tipoImovel: TipoImovel,
  tipoEdificacao: TipoEdificacao,
  tipoServico: TipoServico,
  complementoImovel: String,
  numero: String,
  cep: String,
  bairro: String,
  cidade: Cidade;
  referencia: String,
  situacao: number,
  quartos: String,
  suites: String,
  banheiros: String,
  areaTotal: String,
  areaContruida: String,
  vagas: String,
  comodos: String,
  contato: String,
  registro: String,
  iptu: String,
  ativo: boolean,
  cliente: Cliente,
  proprietario: Proprietario[],
  pertence: Boolean
}
