import React, { ReactElement } from 'react'
import { CloseBtn } from '../../styles/sidebarStyles'
import x_icon from "./svg/x_icon.svg"


interface IGOLSidebarChild {
    child: ReactElement<any, any>
    setSidebarEnabled: React.Dispatch<React.SetStateAction<boolean>>
    setShowGridSettings: React.Dispatch<React.SetStateAction<boolean>>
    setShowPatterns: React.Dispatch<React.SetStateAction<boolean>>
}

export const GOLSidebarChild:React.FC<IGOLSidebarChild> = ({child, setSidebarEnabled, setShowGridSettings, setShowPatterns}) => {

    const handleClose = () => {
        setSidebarEnabled!(false);
        setShowGridSettings!(false);
        setShowPatterns!(false);
    }

    return (
        <>
            <CloseBtn onClick={() => handleClose()}>
                <img src={x_icon} alt="close btn" />
            </CloseBtn>
            {child}
        </>
    )
}
