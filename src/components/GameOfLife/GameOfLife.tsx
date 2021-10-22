import produce from 'immer';
import { stringify } from 'querystring';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { brotliCompressSync, brotliDecompressSync } from 'zlib';
import useScreen from '../../hooks/useScreen';
import useWindowSize from '../../hooks/useWindowSize';
import { Cell, CellRelative, ControlsContainer, GameContainer, GameContainerRelative, IndividualPattern, PatternCarousel, Row } from '../../styles/gameOfLifeStyles';
import { Body, Canvas, Main } from '../../styles/mainCanvas';
import { AbsoluteShadow } from '../../styles/sidebarStyles';
import { Sidebar } from '../Sidebar';
import { GOLControls } from './GOLControls';
import { MemoiszedGOLPatternCarousel } from './GOLPatternCarousel';
import { achimsp11, barge2spaceship, patternList } from './GOLPatterns';
import { GOLGridSettings } from './GOLGridSettings';
import { GOLSidebarChild } from './GOLSidebarChild';

export const generateEmptyGrid = (rowsInput: number, colsInput: number) => {
    let rows = [];
    for ( let i = 0; i < rowsInput; i++){
        rows.push(Array.from(Array(colsInput), () => 0));
    }
    return rows;
}



interface IGameOfLife {
    sidebarEnabled: boolean
    setSidebarEnabled: React.Dispatch<React.SetStateAction<boolean>>

}
export const GameOfLife: React.FC<IGameOfLife> = ({sidebarEnabled, setSidebarEnabled}) => {

    useEffect(() => {
        const shadow = document.querySelector(".shadow")
        shadow?.addEventListener('click', () => {
            setSidebarEnabled(false);
            setShowGridSettings(false);
            setShowPatterns(false);
        })
        

        return () => {
            shadow?.removeEventListener('click', () => {
                setSidebarEnabled(false);
                setShowGridSettings(false);
                setShowPatterns(false);
            })
        }
    })

    

    const screen = useScreen()
    
    const generateRandomGrid = (rowsInput: number, colsInput: number) => {
        let rows = [];
        for ( let i = 0; i < rowsInput; i++){
            rows.push(Array.from(Array(colsInput), () => Math.random() > 0.7 ? 1 : 0));
        }
        return rows;
    }

    // const [sidebarToggle, setSideBarToggle] = useState(false);

    const [cellSize, setCellSize] = useState(() => {
        if (screen!.width < 800){
            return 7;
        }
        return 15;
    });
    const [numRows, setNumRows] = useState(() => {
        return 40;
    });

    const [numCols, setNumCols] = useState(() => {
        if (screen!.width < 400){
            return 40;
        }
        return 50;
    });
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid(numRows, numCols);
    });

    const [showPatterns, setShowPatterns] = useState(false)
    const [showGridSettings, setShowGridSettings] = useState(false)

    // ==== REFS ===============================
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const colsRef = useRef(numCols);
    colsRef.current = numCols;

    const rowsRef = useRef(numRows);
    rowsRef.current = numRows;

    const cellSizeRef = useRef(cellSize);
    cellSizeRef.current = cellSize;
    //===========================================


    const calculateNeighbors = (grid: number[][], x: number, y: number) => {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++){
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < colsRef.current && y1 >= 0 && y1 < rowsRef.current && grid[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }


    const countNeighborsSeamless = (grid: number[][], x:number, y:number) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {

            let col = (x + i + colsRef.current) % colsRef.current;
            let row = (y + j + rowsRef.current) % rowsRef.current;

            sum += grid[col][row];

          }
        }

        sum -= grid[x][y];
        return sum;
      }

    const countNeighbors = (g: number[][], i:number,j: number) => {
        let neighbours = 0;
        if (g[i-1] && g[i-1][j]){
            neighbours+=1
          }
          if (g[i-1] && g[i-1][j-1]){
            neighbours+=1
          }
          if (g[i-1] && g[i-1][j+1]){
            neighbours+=1
          }
          if (neighbours > 3 ){
              return 10;
          }
          if (g[i] && g[i][j-1]){
            neighbours+=1
          }
          if (neighbours > 3 ){
            return 10;
        }
          if (g[i] && g[i][j+1]){
            neighbours+=1
          }
          if (neighbours > 3 ){
            return 10;
        }
          if (g[i+1] && g[i+1][j+1]){
            neighbours+=1
          }
          if (neighbours > 3 ){
            return 10;
        }
          if (g[i+1] && g[i+1][j]){
            neighbours+=1
          }
          if (neighbours > 3 ){
            return 10;
        }
          if (g[i+1] && g[i+1][j-1]){
            neighbours+=1
          }  
          return neighbours
    }

    const runGame = useCallback(() => {
        if (!runningRef.current){
            return
          }
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let row = 0; row< g.length; row++){
                for(let col = 0; col< g[0].length; col++){
                    // let neighbors = countNeighbors(g,row,col);
                    let neighbors = countNeighborsSeamless(g,row,col);

                    if (neighbors > 3 || neighbors < 2){
                    gridCopy[row][col] = 0
                    } else if (g[row][col] === 0 && neighbors === 3){
                    gridCopy[row][col] = 1
                    }
                }
                }
            })
        })
        setTimeout(runGame, 1)
    }, [])

    const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const handleChangeRows = (e: number) => {
        let newRows = parseInt(e.target.value);
        if (newRows <= 150 && newRows >= 0){
            setRunning(false);
            setNumRows(newRows);
            const newGrid = generateEmptyGrid(newRows,colsRef.current);
            setGrid(newGrid)
        }
        
    }
    const handleChangeCols = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const handleChangeCols = (e: number) => {
        let newCols = parseInt(e.target.value);
        if (newCols <= 150 && newCols >= 0){
            setRunning(false);
            setNumCols(newCols);
            const newGrid = generateEmptyGrid(rowsRef.current, newCols);
            setGrid(newGrid)
        }
          
    }
    const handleChangeCellSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const handleChangeCellSize = (e: number) => {
        setRunning(false);
        setCellSize(parseInt(e.target.value));
    }


    const handleSaveToPC = (jsonData: number[][]) => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'filename.json';
        link.href = url;
        link.click();
      }

    const loadPattern = (pattern: number[][] = barge2spaceship) => {
        let newGrid
        if (colsRef.current < pattern.length || rowsRef.current < pattern[0].length){
            newGrid = generateEmptyGrid(50,50)
        } else {
            newGrid = JSON.parse(JSON.stringify(generateEmptyGrid(rowsRef.current,colsRef.current)))
        }

        let offsetX = Math.floor((newGrid[0].length - pattern[0].length) / 2)
        let offsetY = Math.floor((newGrid.length - pattern.length) / 2)
        

        for (let i = 0; i < pattern.length; i++){
            for (let j = 0; j < pattern[0].length; j++){
                newGrid[i + offsetY][j + offsetX] = pattern[i][j]
            }
        }

        setNumCols(newGrid[0].length)
        setNumRows(newGrid.length)
        setGrid(newGrid)
    }



    
    


    return (
        <Main className="main"
            height={rowsRef!.current * cellSize}
            width={screen!.width}
        >
            <Sidebar 
                enabled={showGridSettings} 
                children={
                    <GOLSidebarChild 
                        child={
                            <GOLGridSettings 
                            handleChangeRows={handleChangeRows}
                                handleChangeCols={handleChangeCols}
                                handleChangeCellSize={handleChangeCellSize}    
                                numRows={numRows}
                                numCols={numCols}
                                cellSize={cellSize}
                                setSidebarEnabled={setSidebarEnabled}
                                setShowGridSettings={setShowGridSettings}
                                setShowPatterns={setShowPatterns}
                            
                            />
                        }
                        setSidebarEnabled={setSidebarEnabled}
                        setShowGridSettings={setShowGridSettings}
                        setShowPatterns={setShowPatterns}
                    />
                }
            />
            <Sidebar 
                enabled={showPatterns} 
                children={
                    <GOLSidebarChild 
                        child={
                            <MemoiszedGOLPatternCarousel 
                                loadPattern={loadPattern}
                            />
                        }
                        setSidebarEnabled={setSidebarEnabled}
                        setShowGridSettings={setShowGridSettings}
                        setShowPatterns={setShowPatterns}
                    />
                    
            }
            />            
            <Body
                className="body"
            >
                <GOLControls 
                    setGrid={setGrid} 
                    setRunning={setRunning}
                    setSideBarToggle={setSidebarEnabled}
                    sidebarToggle={sidebarEnabled}
                    runGame={runGame}
                    running={running}
                    runningRef={runningRef}
                    numCols={numCols}
                    numRows={numRows}
                    generateEmptyGrid={generateEmptyGrid}
                    generateRandomGrid={generateRandomGrid} 
                    setShowGridSettings={setShowGridSettings}
                    showGridSettings={showGridSettings}
                    showPatterns={showPatterns}
                    setShowPatterns={setShowPatterns}
                />
                {/* ===================  FOR PATTERN DEBUG  ========================== */}
                <div
                    onClick={() => handleSaveToPC(grid)}
                >save</div>
                {/* =========================================================== */}
            
                    <GameContainerRelative 
                    rows={rowsRef.current} cols={colsRef.current} cellSize={cellSize}>
                        {
                            grid.map((row, i) => (
                                row.map((col,j) => (
                                    <CellRelative
                                        cellSize={cellSizeRef.current}
                                        key={`${i}-${j}`}
                                        style={{
                                            height: `${cellSize}px`,
                                            width: `${cellSize}px`,
                                            left: `${cellSize * j}px`,
                                            top: `${cellSize * i}px`,
                                            backgroundColor: `${col === 0 ? '#1E1E1E' : '#C0C0C0'}`,
                                        }}
                                        onClick={() => {
                                            const newGrid = produce(grid, gridCopy => {
                                                gridCopy[i][j] = grid[i][j] === 0 ? 1 : 0;
                                            })
                                            console.log(newGrid)
                                            setGrid(newGrid)
                                        }}
                                        onMouseEnter={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                            if (e.buttons === 1 || e.buttons === 3){
                                                const newGrid = produce(grid, gridCopy => {
                                                    gridCopy[i][j] = grid[i][j] === 0 ? 1 : 0;
                                                })
                                                setGrid(newGrid)
                                            }
                                        }}
                                    />
                                ))
                            ))
                        }
                    </GameContainerRelative>
                    {/* <GameContainer
                        style={{
                            gridTemplateColumns: `repeat(${numCols}, ${cellSizeRef.current}px)`
                          }}
                    >
                        {grid.map((row, i) => (
                            row.map((col,j) => (
                                <Cell
                                    key={`${i}-${j}`} 
                                    size={cellSizeRef.current}
                                    style={{
                                        backgroundColor: `${col === 0 ? '#1E1E1E' : '#E0E0E0'}`,
                                    }}
                                    onClick={() => {
                                        const newGrid = produce(grid, gridCopy => {
                                            gridCopy[i][j] = grid[i][j] === 0 ? 1 : 0;
                                        })
                                        console.log(newGrid)
                                        setGrid(newGrid)
                                    }}
                                    onMouseEnter={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                        if (e.buttons === 1 || e.buttons === 3){
                                            const newGrid = produce(grid, gridCopy => {
                                                gridCopy[i][j] = grid[i][j] === 0 ? 1 : 0;
                                            })
                                            setGrid(newGrid)
                                        }
                                    }}
                                />
                        ))
                        ))}
                    </GameContainer> */}
                    
                
                    
            </Body>
        </Main>
    )
}
