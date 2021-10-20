import styled from "styled-components";


export const GameContainer = styled.div`
    padding: 1rem 2rem;
    box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
    border-radius: 1rem;
    display: grid;
    margin: 1rem auto 0 auto;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`

export const Cell = styled.div`
    display: flex;
    flex-direction: row;
    outline: 1px solid rgba(200,200,200, 1);
    
`
// for absolute cells: =============================
interface GameContainerRelativeProps {
    readonly rows: number,
    readonly cols: number,
    readonly cellSize: number,
  }

export const GameContainerRelative = styled.div<GameContainerRelativeProps>`
    padding: 1rem 2rem;
    margin: 1rem auto 5rem auto;
    background: #1E1E1E;
    height: ${props => `${props.rows * props.cellSize}px`};
    width: ${props => `${props.cols * props.cellSize}px`};
    position: relative;

`

export const CellRelative = styled.div`
    flex-direction: row;
    outline: 1px solid #0C0C0C;
    position: absolute;
    /* pointer-events: none; */

`

export const ControlsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 0;
`
export const ControlsBtn = styled.button`
    border: none;
    border-radius: 2px;
    height: 1.75rem;
    font-weight: 500;
    min-width: 5rem;
    background: #e3e3e3;
    margin: 0 0.5rem;
    padding: 0 5px;
    letter-spacing: 0px;
    &:hover{
        cursor: pointer;
    }
`


export const GOLSidebarInjection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const GOLSidebarChild = styled.input`
    -webkit-appearance:     none;
    -moz-appearance:        none;
    -ms-appearance:         none;
    -o-appearance:          none;
    appearance:             none;
    display: flex;
    border-radius: 0;
    border: none;
    outline: none;
    margin-bottom: 1rem;
    padding: 0rem 1rem;
    height: 2rem;
    width: 100%;
    
`