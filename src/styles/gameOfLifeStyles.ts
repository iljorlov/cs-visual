import styled from "styled-components";


export const GameContainer = styled.div`
    box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
    display: grid;
    margin: 1rem auto 0 auto;
    height: 100%;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`

interface ICell {
    size: number
}
export const Cell = styled.div<ICell>`
    display: flex;
    flex-direction: row;
    outline: 1px solid rgba(200,200,200, 1);
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
    
`
// for absolute cells: =============================
interface GameContainerRelativeProps {
    readonly rows: number,
    readonly cols: number,
    readonly cellSize: number,
  }

export const GameContainerRelative = styled.div<GameContainerRelativeProps>`
    padding: 0rem 0rem;
    margin: 1rem auto 5rem auto;
    background: #1E1E1E;
    height: ${props => `${props.rows * props.cellSize - 2}px`};
    width: ${props => `${props.cols * props.cellSize - 2}px`};
    position: relative;

`
interface ICellRelative {
    cellSize: number
}
export const CellRelative = styled.div<ICellRelative>`
    flex-direction: row;
    outline: 1px solid #0c0c0c;
    position: absolute;
`

export const ControlsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 0 0 2rem 0;
`
export const ControlsBtn = styled.button`
    border: none;
    border-radius: 2px;
    height: 1.75rem;
    font-weight: 500;
    min-width: 5rem;
    background: #e3e3e3;
    margin: 0.5rem 0.5rem;
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

export const PatternCarousel = styled.div`
    height: 300px;
    width: 100%;
    display: flex;
    box-shadow: 5px 5px 6px rgba(0,0,0,0.1);
`