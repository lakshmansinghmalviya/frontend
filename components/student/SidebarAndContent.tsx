import React, { FC, ReactNode } from 'react'
import Sidebar from './StudentSidebar';

interface SidebarAndContentProps {
    children: ReactNode;
}

const SidebarAndContent: FC<SidebarAndContentProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar />
            </div>
            <div style={{ marginLeft: '200px', width: '100vw' }}>
                {children}
            </div>
        </div>
    )
}

export default SidebarAndContent