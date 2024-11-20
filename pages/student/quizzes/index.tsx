import ListAllQuiz from '@/components/student/ListAllQuiz'
import SidebarAndContent from '@/components/student/SidebarAndContent'

const QuizzesForUsersPage = () => {

    return (
        <SidebarAndContent
            children={<ListAllQuiz />}
        />
    )
}

export default QuizzesForUsersPage
