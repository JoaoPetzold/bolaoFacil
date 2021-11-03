import Permissao from '../entities/PERMISSAO';

export default {
    render(permissao: Permissao){
        return{
            CD_PERMISSAO: permissao.CD_PERMISSAO,
            NOME: permissao.NOME
        }
    },
    renderMany(permissao: Permissao[]){
        return permissao.map(permissao => this.render(permissao))
    }
}