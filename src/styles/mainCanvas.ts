import styled from "styled-components";

interface IMain {
    height?: number
    width?: number
}
export const Main = styled.div<IMain>`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`
// export const Main = styled.div<IMain>`

//     height: ${props => `${props.height + 150}px`};

//     width: 100%;
//     max-width: ${props => `${props.width}px`};
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// `

export const Body = styled.div`
    width: 100%;
    height: 100%;
    margin: 1rem auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
`

interface ICanvas {
    width?: number
    height?: number
}
export const Canvas = styled.div<ICanvas>`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    /* margin: 0 auto; */
    margin: 0;
`

export const AppContainer = styled.div`
    position: relative;
    height: 100%;
`