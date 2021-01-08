import React, {Component} from 'react'

import Main from '../template/main'

const headerProps = {
    icon: 'database',
    title: 'Versões',
    subtitle: 'Controle de Versões'
}

export default class versionControl extends Component {
    render() {
        return (
            <Main {...headerProps}>
                teste
            </Main>
        )
    }
}