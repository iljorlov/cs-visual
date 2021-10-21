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
    margin: 1rem auto 2rem auto;
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

    @media (max-width: 500px){
        margin-bottom: 5rem;
    }
`
export const ControlsBtn = styled.button`
    border-top: 3px solid #CFCFCF;
    border-left: 3px solid #CFCFCF;
    border-bottom: 3px solid #9C9F9E;
    border-right: 3px solid #9C9F9E;
    height: 1.75rem;
    font-weight: 500;
    min-width: 5rem;
    background: #BFBFBF;
    margin: 0.5rem 0.5rem;
    padding: 0 5px;
    letter-spacing: 0px;
    position: relative;
    &:hover{
        cursor: pointer;
        border-bottom: 3px solid #CFCFCF;
        border-right: 3px solid #CFCFCF;
        border-top: 3px solid #9C9F9E;
        border-left: 3px solid #9C9F9E;
    }
    
`


export const GOLSidebarInjection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: inherit;
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
    margin: 0.5rem 0 1rem;
    padding: 0rem 1rem;
    height: 2rem;
    width: 100%;
    border-top: 3px solid #CFCFCF;
    border-left: 3px solid #CFCFCF;
    border-bottom: 3px solid #9C9F9E;
    border-right: 3px solid #9C9F9E;
    color: #1E1E1E;
&:hover{
        border-bottom: 3px solid #CFCFCF;
        border-right: 3px solid #CFCFCF;
        border-top: 3px solid #9C9F9E;
        border-left: 3px solid #9C9F9E;
    }
`

export const PatternCarousel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 5px 5px 6px rgba(0,0,0,0.1);
    background: inherit;
    padding: 0.5rem;
    bottom: 0;
    z-index: 8;
`

interface IIndividualPattern {
    cols: number
    cellSize: number
}
export const IndividualPattern = styled.div<IIndividualPattern>`
    display: flex;
    width: ${props => `${props.cols * props.cellSize}px`};
    height: 100%;
    background: inherit;
`