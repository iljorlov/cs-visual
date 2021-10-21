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
    background: #E1E1E1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    left: ${props => `${props.enabled ? '0' : '-321'}px`};
    transition: all 0.2s ease;
    padding: 2rem 1rem;
    z-index: 100;
`