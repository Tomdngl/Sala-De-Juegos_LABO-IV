export class Usuario {
    email:string;
    clave:string;
    rol:string;

    constructor(email:string,clave:string,rol:string)
    {
        this.email = email;
        this.clave = clave;
        this.rol = rol
    }
}
