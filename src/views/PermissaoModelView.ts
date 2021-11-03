import Permissao from '../entities/PERMISSAO';
import RolesView from './RolesView';

export default {
    render(permissao: Permissao){
        return{
            CD_PERMISSAO: permissao.CD_PERMISSAO,
            NOME: permissao.NOME,
            ROLES: RolesView.renderMany(permissao.ROLES)
        }
    },
    renderMany(permissao: Permissao[]){
        return permissao.map(permissao => this.render(permissao))
    }
}