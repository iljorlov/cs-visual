import produce from 'immer';
import { stringify } from 'querystring';
import React, { useCallback, useRef, useState } from 'react'
import useScreen from '../../hooks/useScreen';
import useWindowSize from '../../hooks/useWindowSize';
import { Cell, CellRelative, ControlsContainer, GameContainer, GameContainerRelative, PatternCarousel, Row } from '../../styles/gameOfLifeStyles';
import { Body, Canvas, Main } from '../../styles/mainCanvas';
import { Sidebar } from '../Sidebar';
import { GOLControls } from './GOLControls';
import { achimsp11, barge2spaceship, patternList } from './GOLPatterns';
import { GOLSidebarChildren } from './GOLSidebarChildren';

export const generateEmptyGrid = (rowsInput: number, colsInput: number) => {
    let rows = [];
    for ( let i = 0; i < rowsInput; i++){
        rows.push(Array.from(Array(colsInput), () => 0));
    }
    return rows;
}

export const GameOfLife = () => {

    const screen = useScreen()
    
    const generateRandomGrid = (rowsInput: number, colsInput: number) => {
        let rows = [];
        for ( let i = 0; i < rowsInput; i++){
            rows.push(Array.from(Array(colsInput), () => Math.random() > 0.7 ? 1 : 0));
        }
        return rows;
    }

    const [sidebarToggle, setSideBarToggle] = useState(false);

    const [cellSize, setCellSize] = useState(15);
    const [numRows, setNumRows] = useState(() => {
        return 50;
    });

    const [numCols, setNumCols] = useState(() => {
        
        if (screen!.width < 800){
            return 25;
        }
        return 50;
    });
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid(numRows, numCols);
    });

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
                for (let i = 0; i< g.length; i++){
                for(let j = 0; j< g[i].length; j++){
                    let neighbours = countNeighbors(g,i,j);
                    if (neighbours > 3 || neighbours < 2){
                    gridCopy[i][j] = 0
                    } else if (g[i][j] === 0 && neighbours === 3){
                    gridCopy[i][j] = 1
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
        if (newRows <= 100 && newRows >= 1){
            setRunning(false);
            setNumRows(newRows);
            const newGrid = generateEmptyGrid(newRows,colsRef.current);
            setGrid(newGrid)
        }
        
    }
    const handleChangeCols = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const handleChangeCols = (e: number) => {
        let newCols = parseInt(e.target.value);
        if (newCols <= 120 && newCols >= 1){
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
        if (rowsRef.current < pattern.length || colsRef.current < pattern[0].length){
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

        setGrid(newGrid)
    }
    
    


    return (
        <Main className="main"
            height={rowsRef!.current * cellSize}
            width={screen!.width}
        >
            <Sidebar 
                enabled={sidebarToggle} 
                children={
                    <GOLSidebarChildren 
                        handleChangeRows={handleChangeRows}
                        handleChangeCols={handleChangeCols}
                        handleChangeCellSize={handleChangeCellSize}    
                        numRows={numRows}
                        numCols={numCols}
                        cellSize={cellSize}
                    />}
            />
            <Body
                className="body"
            >
                <GOLControls 
                    setGrid={setGrid} 
                    setRunning={setRunning}
                    setSideBarToggle={setSideBarToggle}
                    sidebarToggle={sidebarToggle}
                    runGame={runGame}
                    running={running}
                    runningRef={runningRef}
                    numCols={numCols}
                    numRows={numRows}
                    generateEmptyGrid={generateEmptyGrid}
                    generateRandomGrid={generateRandomGrid} 
                />
                <div
                    onClick={() => handleSaveToPC(grid)}
                >save</div>
                <div
                    onClick={() => loadPattern()}
                >load

                </div>
                {/* <Canvas
                
                > */}
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
                    
                {/* </Canvas> */}
                <PatternCarousel>
                    {patternList.map(pattern => (
                        <GameContainerRelative
                            rows={pattern.length}
                            cols={pattern[0].length}
                            cellSize={5}
                            onClick={() => loadPattern(pattern)}
                        >
                            {
                            pattern.map((row, i) => (
                                row.map((col,j) => (
                                    <CellRelative
                                        cellSize={cellSizeRef.current}
                                        key={`${i}-${j}`}
                                        style={{
                                            height: `${5}px`,
                                            width: `${5}px`,
                                            left: `${5 * j}px`,
                                            top: `${5 * i}px`,
                                            backgroundColor: `${col === 0 ? '#1E1E1E' : '#E0E0E0'}`,
                                        }}
                                    />
                                ))
                            ))
                        }
                        </GameContainerRelative>
                    ))}
                </PatternCarousel>
            </Body>
        </Main>
    )
}
