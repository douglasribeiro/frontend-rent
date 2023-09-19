import { Imovel } from "./imovel";
import { Proprietario } from "./proprietario";

export interface ImovelProprietario {
  id: ImovelProprietarioId;
}

export interface ImovelProprietarioId {
  imovel: Imovel;
  proprietario: Proprietario;
}
