import ListAllResult from '@/components/student/ListAllResult'
import SidebarAndContent from '@/components/student/SidebarAndContent'

const ResultsForUsersPage = () => {

    return (
        <SidebarAndContent
            children={<ListAllResult />}
        />
    )
}

export default ResultsForUsersPage
