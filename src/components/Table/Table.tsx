import React, {useState, createRef, useEffect, useMemo} from 'react'
import styled, {css} from 'styled-components'

import THead from "./THead";
import TBody from "./TBody";

const STICKY_COLUMN_WIDTH = 150 // px

export type Column = {
    header: string;
    dataField?: string;
    width?: string;
    sort?: boolean;
}

const TableContainer = styled.table<{ lastColumnSticky: boolean }>`
    border: 1px solid #ededed;
    text-align: center;
    margin: 0 auto;
    td, th {
        padding: 15px;
    }
    ${props => props.lastColumnSticky && css`
        thead th:last-child, tbody tr td:last-child {
            position:fixed;
            right: 0;
            background-color: white;
            width: ${STICKY_COLUMN_WIDTH}px;
            min-width: unset;
            opacity: 0.75;
            font-weight: bold;
            border-left: 1px solid #ededed;
       }
    `}        
`

const Table = ({columns, data}: { columns: Column[], data: any[] }) => {
    useEffect(() => {
        checkTableOverlapping()
        // TODO: on resize event handler
    }, [])
    const [animating, setAnimating] = useState(false);
    const [lastColumnSticky, setLastColumnSticky] = useState(false)
    const [animationComplete, setAnimationCompleted] = useState(false);
    const [sortKey, setSortKey] = useState();
    const [sortDirection, setSortDirection] = useState();
    const table = createRef<HTMLTableElement>()

    const checkTableOverlapping = () => {
        if(table.current) {
            if ((table.current.getBoundingClientRect().right - STICKY_COLUMN_WIDTH / 2 ) >= window.innerWidth) {
                setLastColumnSticky(true)
            } else {
                setLastColumnSticky(false)
            }
        }
    }

    const fadeOutBody = () => {
        setAnimating(true)
        setAnimationCompleted(false)
    }

    const fadeInBody = () => {
        setAnimationCompleted(true)
        setAnimating(false)
    }

    const requestSort = (column: Column) => {
        let direction = 'ascending';
        if (sortKey === column.dataField && sortDirection === 'ascending') {
            direction = 'descending';
        }
        setSortKey(column.dataField)
        setSortDirection(direction)
    }

    const items = useMemo(() => {
        fadeOutBody()
        let sortedProducts = [...data];
        sortedProducts.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) {
                return sortDirection === 'ascending' ? -1 : 1;
            }
            if (a[sortKey] > b[sortKey]) {
                return sortDirection === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setTimeout(fadeInBody, 500)
        return sortedProducts;
    }, [data, sortDirection, sortKey]);

    return (
        <TableContainer lastColumnSticky={lastColumnSticky} ref={table}>
            <THead columns={columns} requestSort={requestSort} />
            <TBody columns={columns}
                   data={items}
                   animating={animating}
                   animationComplete={animationComplete}
            />
        </TableContainer>
    )
}

export default Table