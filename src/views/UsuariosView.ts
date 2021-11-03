import Usuario from '../entities/USUARIO';

export default {
    render(usuario: Usuario){
        return{
            CD_USUARIO: usuario.CD_USUARIO,
            NOME: usuario.NOME
        }
    },
    renderMany(usuario: Usuario[]){
        return usuario.map(usuario => this.render(usuario))
    }
}
