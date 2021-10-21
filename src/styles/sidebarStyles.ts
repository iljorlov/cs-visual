import styled from "styled-components";


interface StyledSidebarProps {
    readonly enabled: boolean;
}
export const StyledSidebar = styled.div<StyledSidebarProps>`
    width: 320px;
    min-height: 100vh;
    height: 100%;
    position: absolute;
    top: 0;
    /* background: #E1E1E1; */
    background: #1E1E1E;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    left: ${props => `${props.enabled ? '0' : '-321'}px`};
    transition: all 0.1s ease-out;
    padding: 2rem 1rem;
    z-index: 100;
    border-bottom: 3px solid #808583;
    border-left: 3px solid #808583;
    border-top: 3px solid #9C9F9E;
    border-right: 3px solid #9C9F9E;
    overflow: scroll;
`

interface IAbsoluteShadow {
    enabled: boolean
}
export const AbsoluteShadow = styled.div<IAbsoluteShadow>`
    display: ${props => `${props.enabled ? 'block' : 'none'}`};
    position: fixed;
    width: 100vw;
    height: 100vh;
    transition: all 0.3s ease-in;
    background: rgba(0,0,0,0.5);
    z-index: 2;
    pointer-events: fill;
`

export const SidebarHeader = styled.p`
    color: #BFBFBF;
    background: inherit;
`

export const CloseBtn = styled.div`
    height: 29px;
    width: 29px;
    margin-bottom: 2rem;
    cursor: pointer;
`