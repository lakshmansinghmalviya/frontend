import QuestionsTable from '@/components/educator/QuestionsTable'
import React from 'react'
import SidebarAndTable from '@/components/educator/SidebarAndTable'

const QuestionManagementPage = () => {
    return (
        <SidebarAndTable
            children={<QuestionsTable />}
        />
    )
}

export default QuestionManagementPage