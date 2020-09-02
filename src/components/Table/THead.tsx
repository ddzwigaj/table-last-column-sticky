import React from 'react'
import styled from 'styled-components'
import {Column} from './Table'

const Th = styled.th<{ width?: string }>`
    min-width: ${(props) => props.width};
    border-bottom: 1px solid #ededed;
    button {
        background: none;
        border: none;
        font-size: inherit;
        font-weight: inherit;
    }
`

interface THeadProps {
    columns: Column[]
    requestSort: (column: Column) => void;
}

const THead = ({columns, requestSort}: THeadProps) => {
    const getColumn = (column: Column, columnIndex: number) => {
        if (column.sort) {
            return (
                <Th key={columnIndex} width={column.width}>
                    <button onClick={() => { requestSort(column) }}>
                        {column.header}
                    </button>
                </Th>
            )
        }
        return (
            <Th key={columnIndex} width={column.width} onClick={() => { requestSort(column) }}>
                {column.header}
            </Th>
        )
    }

    return (
        <thead>
            <tr>
                {columns.map((column: Column, columnIndex) => (getColumn(column, columnIndex)))}
            </tr>
        </thead>
    )
}

export default THead