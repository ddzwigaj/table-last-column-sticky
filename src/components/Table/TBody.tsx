import React from 'react'
import styled, {css} from 'styled-components'
import {Column} from './Table'

type BodyStyleProps = {
    animating: boolean,
    animationComplete: boolean
}

type TBodyProps = {
    columns: Column[],
    data: any[],
    animating: boolean,
    animationComplete: boolean
}

const TableBody = styled.tbody<BodyStyleProps>`
    opacity: ${(props) => (!props.animating || props.animationComplete) ? 1 : 0};
    ${props => props.animationComplete && css`
        transition: opacity 0.3s;
    `}
`

const TBody = ({columns, data, animating, animationComplete}: TBodyProps) => {
    const cell = (row: any, column: Column, columnIndex: number) => {
        if (!column.dataField) return
        return (
            <td key={columnIndex}>{row[column.dataField]}</td>
        )
    }

    return (
        <TableBody data-testid='tbody' animating={animating} animationComplete={animationComplete}>
            {data.map((row, rowIndex) => (
                <tr data-testid={`row-${rowIndex}`} key={rowIndex}>
                    {columns.map((column, columnIndex) => (cell(row, column, columnIndex)))}
                </tr>
            ))}
        </TableBody>
    )
}

export default TBody