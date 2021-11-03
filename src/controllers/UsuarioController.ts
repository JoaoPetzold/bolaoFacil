import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../entities/USUARIO';
import Roles from '../entities/ROLES';
import UsuarioModelView from '../views/UsuarioModelView';

export default {
    async show(res: Response){
        const UsuarioRep = getRepository(Usuario);
        const usuario = await UsuarioRep.find({relations: ['ROLES']});
        return res.json(UsuarioModelView.renderMany(usuario)); 

    },

    async authUser(req: Request, res: Response){
        return res.status(200).json({USUARIO: req.id_usuario})
    },

    async showOne(req: Request, res: Response){
        const {CD_USUARIO} = req.params;
        const UsuarioRep = getRepository(Usuario);
        const usuario = await UsuarioRep.findOne(CD_USUARIO, {relations: ['ROLES']});
        return res.status(200).json(usuario); 

    },

    async create(req: Request, res: Response){
        const {NOME,
            SENHA, 
            ROLES} = req.body;
        const RolesRep = getRepository(Roles);
        const existeRole = await RolesRep.findByIds(ROLES);
        const UsuarioRep = getRepository(Usuario);
        
        if(existeRole){
            const usuario = UsuarioRep.create({
            NOME,
            SENHA,
            ROLES: existeRole
        });
            await UsuarioRep.save(usuario);
            console.log("EXISTE ROLE: " + JSON.stringify(existeRole))
            return res.status(201).json({MENSAGEM: 'Usuario criado com sucesso', USUARIO: usuario})
        }
        return res.status(400).json({MENSAGEM: 'ROLE INVÁLIDA'})
        
    }
}