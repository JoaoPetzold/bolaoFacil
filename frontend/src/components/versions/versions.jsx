import React, {Component} from 'react'

import Main from '../template/main'

const headerProps = {
    icon: 'database',
    title: 'Versões',
    subtitle: 'Controle de Versões'
}

const initialState = {
    version: { code: '', file: ''},
    list: [],
    visibleRegister: false,
}

export default class versionControl extends Component {

    state = {...initialState}

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Código da Versão</label>    
                            <input type="text" className="form-control" name="version" placeholder="0.0.0.0"></input>
                        </div>   
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Arquivo</label> 
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="file"></input>  
                                <label className="custom-file-label" for="customFile">Escolha o arquivo</label>  
                            </div>    
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}