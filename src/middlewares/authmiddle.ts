import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Usuario from '../entities/USUARIO';

interface TokenPayLoad {
    id: string;
    iat: number;
    exp: number;
}

async function authMiddle(req: Request){
    const { authorization} = req.headers;
    const UsuarioRep = getRepository(Usuario);
    

    if(!authorization){
        return 
    }

    const token = authorization.replace('Bearer', '').trim();

    //PAYLOAD = {id: usuario.CD_USUARIO}
    try{
        //DECODE
        const data = jwt.verify(token, 'secret')
        console.log(data)
        
        const {id} = data as TokenPayLoad;
        
        req.id_usuario = id;

        const usuario = await UsuarioRep.findOne(req.id_usuario, {relations: ['ROLES']})

        console.log(req.id_usuario)
        if(usuario){
            return usuario;
        }
        
    }catch {
        return  
        }
    }
function is(role: String[]){
    const rolesAuth = async(req: Request, res: Response, next: NextFunction) =>{
        const usuario = await authMiddle(req);

        const userRoles = usuario?.ROLES.map(role => role.NOME);
        console.log(userRoles);

        const existeRole = userRoles?.some(r => role.includes(r));
        console.log(existeRole);

        if(existeRole){
            return next();
        }
        return res.status(401).json({MESSAGE: 'USUARIO NÃO TEM PERMISSÃO'})
    }
    
return rolesAuth;
}

export {is};