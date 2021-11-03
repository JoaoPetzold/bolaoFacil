import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Permissao from '../entities/PERMISSAO';
import PermissaoModelView from '../views/PermissaoModelView';

export default {

    async show(req: Request, res: Response){

        const PermissaoRep = getRepository(Permissao);
        const permissao = await PermissaoRep.find({relations: ['ROLES']})
        return res.status(200).json(PermissaoModelView.renderMany(permissao))
    },

    async showOne(req: Request, res: Response){
        const {CD_PERMISSAO} = req.params;
        const PermissaoRep = getRepository(Permissao);
        const existePermissao = await PermissaoRep.findOne(CD_PERMISSAO);
        if(!existePermissao){
            return res.status(400).json({MENSAGEM: 'NÃO EXISTE PERMISSAO INFORMADA'})
        }
        return res.status(200).json(PermissaoModelView.render(existePermissao));
    },

    async create(req: Request, res: Response) {
        const [{NOME, DESCRICAO, CREATE_AT}] = [req.body];

        const PermissaoRep = getRepository(Permissao);

        const existePermissao = await PermissaoRep.findOne({NOME})

        if(existePermissao){
            return res.status(400).json({MENSAGEM: 'PERMISSÃO JA EXISTE'})
        }

        const permissao = PermissaoRep.create({
            NOME,
            DESCRICAO,
            CREATE_AT
        })
        console.log("DADOS: " + JSON.stringify(permissao))
        await PermissaoRep.save(permissao)
        return res.status(201).json(permissao)
    } 
}