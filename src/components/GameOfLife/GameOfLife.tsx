import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react'
import { Cell, CellRelative, ControlsContainer, GameContainer, GameContainerRelative, Row } from '../../styles/gameOfLifeStyles';
import { Body, Canvas } from '../../styles/mainCanvas';
import { Sidebar } from '../Sidebar';
import { GOLControls } from './GOLControls';
import { GOLSidebarChildren } from './GOLSidebarChildren';


export const GameOfLife = () => {

    const generateEmptyGrid = (rowsInput: number, colsInput: number) => {
        let rows = [];
        for ( let i = 0; i < rowsInput; i++){
            rows.push(Array.from(Array(colsInput), () => 0));
        }
        return rows;
    }
    const generateRandomGrid = (rowsInput: number, colsInput: number) => {
        let rows = [];
        for ( let i = 0; i < rowsInput; i++){
            rows.push(Array.from(Array(colsInput), () => Math.random() > 0.7 ? 1 : 0));
        }
        return rows;
    }

    const [sidebarToggle, setSideBarToggle] = useState(false);

    const [cellSize, setCellSize] = useState(15);
    const [numRows, setNumRows] = useState(40);
    const [numCols, setNumCols] = useState(60);
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid(numRows, numCols);
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const colsRef = useRef(numCols);
    colsRef.current = numCols;

    const rowsRef = useRef(numRows);
    rowsRef.current = numRows;



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
        setTimeout(runGame, 5)
    }, [])

    const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRunning(false);
        setNumRows(parseInt(e.target.value));
        setGrid(() => {
            return generateEmptyGrid(rowsRef.current,colsRef.current)
        });
        
    }
    const handleChangeCols = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRunning(false);
        setNumCols(parseInt(e.target.value));
        setGrid(() => {
            return generateEmptyGrid(rowsRef.current,colsRef.current)
        });    
    }
    const handleChangeCellSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRunning(false);
        setCellSize(parseInt(e.target.value));
    }
    
    


    return (
        <>
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
            <Body>
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
                <Canvas>
                    <GameContainerRelative rows={rowsRef.current} cols={colsRef.current} cellSize={cellSize}>
                        {
                            grid.map((row, i) => (
                                row.map((col,j) => (
                                    <CellRelative
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
                </Canvas>
                
            </Body>
        </>
    )
}
