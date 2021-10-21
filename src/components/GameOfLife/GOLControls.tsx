import React from 'react'
import { ControlsBtn, ControlsContainer } from '../../styles/gameOfLifeStyles'
import randomIcon from './svg/random.svg'

interface IGOLControls {
    setRunning: React.Dispatch<React.SetStateAction<boolean>>
    runGame: () => void
    running: boolean
    runningRef: React.MutableRefObject<boolean>
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>
    generateRandomGrid: (rowsInput: number, colsInput: number) => (0 | 1)[][]
    generateEmptyGrid: (rowsInput: number, colsInput: number) => number[][]
    setSideBarToggle: React.Dispatch<React.SetStateAction<boolean>>
    numRows: number
    numCols: number
    sidebarToggle: boolean
    setShowGridSettings: React.Dispatch<React.SetStateAction<boolean>>
    showGridSettings: boolean
    setShowPatterns: React.Dispatch<React.SetStateAction<boolean>>
    showPatterns: boolean
}


export const GOLControls:React.FC<IGOLControls> = ({setShowPatterns, showPatterns,showGridSettings, setShowGridSettings, setGrid,setRunning,setSideBarToggle,sidebarToggle,runGame,running,runningRef,generateEmptyGrid,generateRandomGrid,numCols,numRows}) => {
    

    const handleShowGridSettings = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setRunning(false);
        setSideBarToggle(!sidebarToggle);
        setShowGridSettings(!showGridSettings)
    }    
    
    const handleShowPatterns = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setRunning(false);
        setSideBarToggle(!sidebarToggle);
        setShowPatterns(!showPatterns)
    }   
    
    return (
        <ControlsContainer>
            <ControlsBtn
                    onClick={() => {
                        setRunning(!running);
                        if (!running){
                            runningRef.current = true;
                            runGame();
                        }
                    }}
                >{running ? 'Stop' : 'Start'}
                </ControlsBtn>
                <ControlsBtn
                    onClick={() => {
                       setRunning(false);
                       setGrid(generateRandomGrid(numRows, numCols))
                   }}
                >Random Seed</ControlsBtn>
                <ControlsBtn
                   onClick={() => {
                       setRunning(false);
                       setGrid(generateEmptyGrid(numRows, numCols))
                   }}
                >Clear</ControlsBtn>
                
                <ControlsBtn
                    // onClick={() => {
                    //     setRunning(false);
                    //     setSideBarToggle(!sidebarToggle);
                    // }}
                    onClick={(e) => handleShowGridSettings(e)}
                >Grid Settings</ControlsBtn>
                <ControlsBtn
                    onClick={(e) => handleShowPatterns(e)}
                >Show Patterns</ControlsBtn>
        </ControlsContainer>
    )
}
