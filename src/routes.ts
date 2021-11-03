import { Router} from "express";

import AuthController from "./controllers/AuthController";
import EmpresaController from "./controllers/EmpresaController";
import UsuarioController from "./controllers/UsuarioController";
import PermissaoController from "./controllers/PermissaoController";
import RolesController from "./controllers/RolesController";
import {is} from "./middlewares/authmiddle";

const routes = Router()

//ROTAS DE CONTROLE DAS EMPRESAS
routes.get('/empresa/:CNPJ', is(['ROLE_ADMINISTRADOR']), EmpresaController.showOne);
routes.get('/empresa', is(['ROLE_ADMINISTRADOR']), EmpresaController.show);
routes.post('/empresa', is(['ROLE_ADMINISTRADOR', 'ROLE_USUARIO']), EmpresaController.create);
routes.put('/empresa/:CNPJ', is(['ROLE_ADMINISTRADOR','ROLE_USUARIO']), EmpresaController.update);

//ROTAS DE CONTROLE DE USUARIOS
routes.get('/usuario', UsuarioController.show);
routes.get('/usuario/:CD_USUARIO', UsuarioController.showOne);
routes.get('/usuario_autenticado', UsuarioController.authUser);
routes.post('/authenticate', AuthController.authenticate);
routes.post('/usuario', UsuarioController.create);

//ROTAS DE CONTROLE DE PERMISSÕES
routes.get('/permissao', PermissaoController.show);
routes.get('/permissao/:CD_PERMISSAO', PermissaoController.showOne);
routes.get('/roles', RolesController.show);
routes.get('/roles/:CD_ROLES', RolesController.showOne);
routes.post('/roles', RolesController.create);
routes.post('/permissao', PermissaoController.create);

export default routes;