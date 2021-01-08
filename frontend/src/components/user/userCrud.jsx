import React, {Component} from 'react'
import axios from 'axios'

import Main from '../template/main'

const headerProps = {
    icon: 'user',
    title: 'Clientes',
    subtitle: 'Controle de Clientes'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: ''},
    list: [],
    visibleRegister: false,
}

export default class userCrud extends Component {


    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear() {
        this.setState({ user: initialState.user, visibleRegister: initialState.visibleRegister})
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user).then(resp => {
            const list = this.getUpdatedList(resp.data, true)
            this.setState({ user: initialState.user, list, visibleRegister: initialState.visibleRegister})
        })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) { list.unshift(user) }
        return list
    }

    updateField(event) {
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>    
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..."></input>
                        </div>   
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-Mail</label> 
                            <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o email..."></input>   
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

    load(user) {
        this.setState({ visibleRegister: true })
        this.setState({user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
          const list = this.getUpdatedList(user, false)
          this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-Mail</th>
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
        return this.state.list.map(user => {
            return (
               <tr key={user.id}>
                   <td>{user.id}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   <td>
                       <button className="btn btn-warning" onClick={() => this.load(user)}>
                           <i className="fa fa-pencil"></i>
                       </button>
                       <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                       </button>
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