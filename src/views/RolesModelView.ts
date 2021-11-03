import Roles from '../entities/ROLES';
import PermissaoView from './PermissaoView';
import UsuariosView from './UsuariosView';

export default {
    render(roles: Roles){
        return{
            CD_roles: roles.CD_ROLES,
            NOME: roles.NOME,
            PERMISSAO: PermissaoView.renderMany(roles.PERMISSAO),
            USUARIOS: UsuariosView.renderMany(roles.USUARIOS)
        }
    },
    renderMany(roles: Roles[]){
        return roles.map(roles => this.render(roles))
    }
}