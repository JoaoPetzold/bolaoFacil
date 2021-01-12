import React, {Component} from 'react'
import moment from 'moment';

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

import Main from '../template/main'

const headerProps = {
    icon: 'database',
    title: 'Versões',
    subtitle: 'Controle de Versões'
}

const initialState = {
    version: { code: '', data: moment().format("DD/MM/YYYY"), file: ''},
    list: [],
    visibleRegister: false,
}

export default class versionControl extends Component {

    state = {...initialState}

    clear() {
        this.setState({ user: initialState.user, visibleRegister: initialState.visibleRegister})
    }

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

    renderControls() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6 d-flex justify-content-start">
                    <button className="btn btn-success" onClick={e => this.toggleFormControls(e)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button className="btn btn-primary ml-2" onClick={e => document.location.reload(e)}>
                        <i className="fa fa-refresh"></i>
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    toggleFormControls(event) {
        let visibleRegister = {...this.state.visibleRegister}
        visibleRegister[event.target.name] = event.target.value
        if (visibleRegister === true) {visibleRegister = false} else {visibleRegister = true}
        this.setState({ visibleRegister })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Versão</th>
                        <th>Data</th>
                        <th>Caminho</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {this.renderRows()} 
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(versao => {
            return (
               <tr key={versao.id}>
                   <td>{versao.id}</td>
                   <td>{versao.versao}</td>
                   <td>{versao.data}</td>
                   <td>{versao.caminho}</td>
                   <td>
                       <button className="btn btn-warning" onClick={() => this.load(versao)}>
                           <i className="fa fa-pencil"></i>
                       </button>
                       {/* <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                       </button> */}
                   </td>
               </tr> 
            )
        });
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.state.visibleRegister ? this.renderForm() : this.renderControls()}
                {this.renderTable()}
            </Main>
        )
    }
}