import React, { FC, ReactNode } from 'react'
import Sidebar from './Sidebar';

interface SidebarAndTableProps {
    children: ReactNode;
}
const SidebarAndTable: FC<SidebarAndTableProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar />
            </div>
            <div style={{ marginLeft: '200px', width: '100vw'}}>
                {children}
            </div>
        </div>
    )
}

export default SidebarAndTable