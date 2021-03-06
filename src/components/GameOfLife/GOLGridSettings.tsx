import React from 'react'
import { GOLSidebarInjection, GOLSidebarInput } from '../../styles/gameOfLifeStyles'
import { SidebarHeader } from '../../styles/sidebarStyles'


interface IGOLSidebarChildren {
    children?: React.FC[]
    handleChangeRows: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCols: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeCellSize : (e: React.ChangeEvent<HTMLInputElement>) => void
    numRows: number
    numCols: number
    cellSize: number
    setSidebarEnabled: React.Dispatch<React.SetStateAction<boolean>>
    setShowGridSettings: React.Dispatch<React.SetStateAction<boolean>>
    setShowPatterns: React.Dispatch<React.SetStateAction<boolean>>
}
export const GOLGridSettings:React.FC<IGOLSidebarChildren> = ({ setSidebarEnabled, setShowGridSettings, setShowPatterns,children, handleChangeRows, handleChangeCols, handleChangeCellSize, numRows, numCols, cellSize}) => {
    
    
    
    
    return (
        <GOLSidebarInjection>
            <SidebarHeader>Number of rows: (max 150)</SidebarHeader>
            <GOLSidebarInput type="number" min="0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeRows(e)} value={numRows} name="" id=""  placeholder="rows..."/>
            <SidebarHeader>Number of columns: (max 150)</SidebarHeader>
            <GOLSidebarInput type="number" min="0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCols(e)} value={numCols} name="" id=""  placeholder="columns..."/>
            <SidebarHeader>Cell size:</SidebarHeader>
            <GOLSidebarInput type="number" min="0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCellSize(e)} value={cellSize} name="" id=""  placeholder="cell size..."/>
        </GOLSidebarInjection>
    )
}
