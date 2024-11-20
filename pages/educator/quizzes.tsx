import QuizzesTable from '@/components/educator/QuizzesTable'
import SidebarAndTable from '@/components/educator/SidebarAndTable'

const QuizzesManagementPage = () => {
    return (
        <SidebarAndTable
            children={<QuizzesTable />}
        />
    )
}

export default QuizzesManagementPage