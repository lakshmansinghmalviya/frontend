import SidebarAndContent from '@/components/student/SidebarAndContent';
import StudentProfile from '@/components/student/StudentProfile';

const UserDashboardPage: React.FC = () => {
  return (
    <SidebarAndContent
      children={<StudentProfile />}
    />
  );
};

export default UserDashboardPage;

export const dashboardPageContainer = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
};
