import CategoriesTable from '@/components/admin/CategoriesTable';
import SidebarAndTable from '@/components/admin/SidebarAndTable';
import React from 'react';

const CategoryManagementPage: React.FC = () => {
    return (
        <SidebarAndTable
            children={<CategoriesTable />}
        />
    );
};

export default CategoryManagementPage;
