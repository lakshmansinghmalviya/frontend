import AdminProfile from "@/components/admin/AdminProfile";
import SidebarAndTable from "@/components/admin/SidebarAndTable";

const AdminDashboardPage: React.FC = () => {
  return (
    <SidebarAndTable
      children={<AdminProfile />}
    />
  );
};

export default AdminDashboardPage;

export const dashboardPageContainer = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
};
