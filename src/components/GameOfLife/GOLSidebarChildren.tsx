import React from 'react'
import { GOLSidebarChild, GOLSidebarInjection } from '../../styles/gameOfLifeStyles'
interface IGOLSidebarChildren {
    children?: React.FC[]
    handleChangeRows: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCols: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCellSize : (e: React.ChangeEvent<HTMLInputElement>) => void
    numRows: number
    numCols: number
    cellSize: number
}
export const GOLSidebarChildren:React.FC<IGOLSidebarChildren> = ({children, handleChangeRows, handleChangeCols, handleChangeCellSize, numRows, numCols, cellSize}) => {
    return (
        <GOLSidebarInjection>
            <h6>Number of rows:</h6>
            <GOLSidebarChild type="number" min="5" onChange={(e) => handleChangeRows(e)} value={numRows} name="" id=""  placeholder="rows..."/>
            <h6>Number of columns:</h6>
            <GOLSidebarChild type="number" min="5" onChange={(e) => handleChangeCols(e)} value={numCols} name="" id=""  placeholder="columns..."/>
            <h6>Cell size:</h6>
            <GOLSidebarChild type="number" min="2" onChange={(e) => handleChangeCellSize(e)} value={cellSize} name="" id=""  placeholder="cell size..."/>
        </GOLSidebarInjection>
    )
}
