import SidebarAndTable from '@/components/admin/SidebarAndTable'
import UsersTable from '@/components/admin/UsersTable'
import React from 'react'

const UsersManagementpage = () => {
    return (
        <SidebarAndTable
            children={<UsersTable />}
        />
    )
}

export default UsersManagementpage