import styled from "styled-components";


interface StyledSidebarProps {
    readonly enabled: boolean;
}
export const StyledSidebar = styled.div<StyledSidebarProps>`
    width: 300px;
    height: 100%;
    position: absolute;
    background: #E1E1E1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    left: ${props => `${props.enabled ? '0' : '-350'}px`};
    transition: all 0.2s ease;
    padding: 2rem 1rem;
    z-index: 10;
`