import React, { ReactElement } from 'react'
import { StyledSidebar } from '../styles/sidebarStyles'

interface ISidebar {
    enabled: boolean,
    children?: ReactElement<any, any>
    

}

export const Sidebar:React.FC<ISidebar> = ({enabled, children}) => {
    return (
        <StyledSidebar enabled={enabled}>
            {children}
        </StyledSidebar>
    )
}
