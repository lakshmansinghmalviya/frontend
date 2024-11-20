import ListAllEducator from '@/components/student/ListAllEducator'
import SidebarAndContent from '@/components/student/SidebarAndContent'

const Educators = () => {

    return (
        <SidebarAndContent
            children={<ListAllEducator />}
        />
    )
}

export default Educators