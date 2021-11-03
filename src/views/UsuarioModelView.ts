import Usuario from '../entities/USUARIO';
import Roles from './RolesView';

export default {
    render(usuario: Usuario){
        return{
            CD_USUARIO: usuario.CD_USUARIO,
            NOME: usuario.NOME,
            ROLES: Roles.renderMany(usuario.ROLES)
        }
    },
    renderMany(usuario: Usuario[]){
        return usuario.map(usuario => this.render(usuario))
    }
}
