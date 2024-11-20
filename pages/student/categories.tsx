import ListAllCategory from '@/components/student/ListAllCategory'
import SidebarAndContent from '@/components/student/SidebarAndContent'

const CategoryForUsersPage = () => {
  return (
    <SidebarAndContent
      children={<ListAllCategory />}
    />
  )
}

export default CategoryForUsersPage