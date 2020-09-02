import React from 'react'
import styled, {css} from 'styled-components'
import {Column} from './Table'

type BodyStyleProps = {
    animating: boolean,
    animationComplete: boolean
}

type CellProps = {
   sticky: boolean
}

const TableBody = styled.tbody<BodyStyleProps>`
    opacity: ${(props) => (!props.animating || props.animationComplete) ? 1 : 0};
    ${props => props.animationComplete && css`
        transition: opacity 0.3s;
    `}
`

const Cell = styled.td<CellProps>`
    ${props => props.sticky && css`
        // position: fixed;
        right: 0
    `}
`

const TBody = ({columns, data, animating, animationComplete}: { columns: Column[], data: any[], animating: boolean, animationComplete: boolean }) => {
    const cell = (row: any, column: Column, columnIndex: number) => {
        if (!column.dataField) return
        const isSticky = (columnIndex + 1) === columns.length
        return (
            <Cell key={columnIndex} sticky={isSticky}>{row[column.dataField]}</Cell>
        )
    }

    return (
        <TableBody animating={animating} animationComplete={animationComplete}>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (cell(row, column, columnIndex)))}
                </tr>
            ))}
        </TableBody>
    )
}

export default TBody