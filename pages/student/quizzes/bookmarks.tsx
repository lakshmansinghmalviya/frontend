import ListAllBookmark from '@/components/student/ListAllBookmark'
import SidebarAndContent from '@/components/student/SidebarAndContent'

const bookmarks = () => {
  return (
    <SidebarAndContent
      children={<ListAllBookmark />}
    />
  )
}

export default bookmarks