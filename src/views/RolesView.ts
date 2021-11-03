import Roles from '../entities/ROLES';

export default {
    render(roles: Roles){
        return{
            CD_roles: roles.CD_ROLES,
            NOME: roles.NOME,
        }
    },
    renderMany(roles: Roles[]){
        return roles.map(roles => this.render(roles))
    }
}