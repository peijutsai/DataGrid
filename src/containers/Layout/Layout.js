import React, { Component } from 'react';
import Datagrid from '../../components/Datagrid/Datagrid';
import APIManager from '../../repository/APIManager';
import { connect } from 'react-redux';
import { SET_DATA } from '../../store/actions';

class Layout extends Component {

    componentDidMount = () => {
        APIManager.fetchDynamicData()
            .then(resp => {
                this.props.setDataHandler({
                    headers: resp.keys,
                    dataArray: resp.dataArray
                })
            })
    }

    render() {
        return (
            <Datagrid />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDataHandler: (data) => dispatch({ type: SET_DATA, data: data })
    }
}

export default connect(null, mapDispatchToProps)(Layout)