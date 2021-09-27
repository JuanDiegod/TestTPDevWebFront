export class Empresa {

    constructor(
        public tipoDocumento: string,
        public numeroDocumento: number,
        public razonSocial: string,
        public primerNombre: string,
        public segundoNombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public correo: string,
        public autCelular: number,
        public autCorreo: number
    ) {}
}