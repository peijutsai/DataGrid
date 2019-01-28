import React from 'react';
import Utils from '../../utils/Utils';
import './Datagrid.css';
import { connect } from 'react-redux';
import { SORT_BY_HEADER } from '../../store/actions';

const Datagrid = (props) => {
    let sortedHeaders = Array.from(props.headers)
    sortedHeaders.sort()

    let ths = sortedHeaders.map((header, i) => {
        return (
            <th key={i}
                scope="col"
                onClick={() => props.sortByHeaderHandler(header)}>
                {header}
            </th>
        )
    })

    let trs = props.dataArray.map((obj, i) => {
        return (
            <tr key={i}>
                {createDataRow(obj, sortedHeaders)}
            </tr>
        )
    })

    let lastRowTds = createSumOfEachColumn(sortedHeaders, props.dataArray).map((val, i) => {
        return (
            <td key={i}>{String(val)}</td>
        )
    })

    return (
        <table className="table table-bordered">
            <thead>
                <tr>{ths}</tr>
            </thead>
            <tbody>
                {trs}
                <tr>{lastRowTds}</tr>
            </tbody>
        </table>
    )
}

const createDataRow = (dataObj, sortedHeaders) => {
    return sortedHeaders.map((header, i) => {
        let val = dataObj[header]
        return (
            <td key={i}>
                {val === undefined || val === null ? '' : String(val)}
            </td>
        )
    })
}

const createSumOfEachColumn = (sortedHeaders, dataArray) => {
    let result = new Array(sortedHeaders.length)

    result.fill(NaN)
    dataArray.forEach(obj => {
        sortedHeaders.forEach((header, i) => {
            if (!Utils.isNumeric(obj[header])) {
                return
            }

            let val = Number(obj[header])
            if (isNaN(result[i])) {
                result[i] = 0
            }

            result[i] = result[i] + val
        })
    });

    return result
}


const mapStateToProps = state => {
    return {
        headers: state.headers,
        dataArray: state.dataArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortByHeaderHandler: (header) => dispatch({type: SORT_BY_HEADER, header: header})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Datagrid)