export class Usuario{

    constructor(id=0, direccion = '', nombre='', telefono='', correo='', cedula='', contraseña='', Carro="" ){
        this.id= id;
        this.direccion=direccion;
        this.nombre=nombre;
        this.telefono=telefono;
        this.correo=correo;
        this.contrasena=contraseña;
        this.carro=Carro;
    }

    id: number;
    direccion: string;
    nombre: string;
    telefono: string;
    correo: string;
    cedula: string;
    contrasena: string;
    carro: string;

}