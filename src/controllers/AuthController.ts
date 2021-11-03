import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import bcrypt from  'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../entities/USUARIO';

export default {
    async authenticate(req: Request, res: Response){
        const UsuarioRep = getRepository(Usuario);
        const {NOME, SENHA} = req.body;

        const usuario = await UsuarioRep.findOne({where: {NOME}})

        if(!usuario){
            return res.status(401).json({MENSAGEM: 'Usuario não encontrado'});
        }
        const isValidPassword = await bcrypt.compare(SENHA, usuario.SENHA);

        if(!isValidPassword){
            return res.status(401).json({MENSAGEM: 'Senha incorreta'});
        }

        const token = jwt.sign({id: usuario.CD_USUARIO}, 'secret', {expiresIn: '1d'})
        return res.json({usuario, token})
    }
}