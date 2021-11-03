import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Roles from '../entities/ROLES';
import Permissao from '../entities/PERMISSAO';
import RolesModelView from '../views/RolesModelView';


export default {

    async show(req: Request, res: Response){
        const RolesRep = getRepository(Roles);
        const roles = await RolesRep.find({relations: ['PERMISSAO', 'USUARIOS']});
        return res.status(200).json(RolesModelView.renderMany(roles));
    },

    async showOne(req: Request, res: Response){
        const {CD_ROLES} = req.params;
        const RolesRep = getRepository(Roles);
        const existeRole = await RolesRep.findOne(CD_ROLES, {relations: ['USUARIOS']});
        if(!existeRole){
            return res.status(400).json({MENSAGEM: 'NÃO EXISTE ROLE INFORMADA'})
        }
        return res.status(200).json(RolesModelView.render(existeRole));
    },

    async create(req: Request, res: Response){
        const {NOME, 
            DESCRICAO, 
            PERMISSAO} = req.body;
        const RolesRep = getRepository(Roles);
        const PermissaoRep = getRepository(Permissao);
        const existeRole = await RolesRep.findOne({NOME})
        const existePermissao = await PermissaoRep.findByIds(PERMISSAO)

        if(existeRole){
            return res.status(400).json({MENSAGEM: 'ROLE JA EXISTE'})
        }
        if(!existePermissao){
            return res.status(400).json({MENSAGEM: 'EXISTEM PERMISSÕES INVÁLIDAS'})
        }

        const roles = RolesRep.create({
            NOME,
            DESCRICAO,
            PERMISSAO: existePermissao,
        })
        await RolesRep.save(roles);
        console.log("DADOS DAS ROLES: " + JSON.stringify(roles))
        return res.status(201).json(roles)
    }
}