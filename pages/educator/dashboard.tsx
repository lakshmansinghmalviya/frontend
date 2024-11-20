import EducatorProfile from '@/components/educator/EducatorProfile';
import SidebarAndTable from '@/components/educator/SidebarAndTable';

const EducatorDashboardPage: React.FC = () => {
  return (
    <SidebarAndTable
      children={<EducatorProfile />}
    />
  );
};

export default EducatorDashboardPage;

export const dashboardPageContainer = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
};