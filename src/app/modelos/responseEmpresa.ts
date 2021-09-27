import { Empresa } from "./empresa";

export class ResponseEmpresa {

    constructor(
        public code: string,
        public message: string,
        public empresas: Empresa[]
    ){ }
}