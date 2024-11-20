import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteQuizRequest, fetchQuizzesRequest } from '@/redux/slices/quizSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/educator/EducatorTable.module.css';
import { Filters, Quiz, Severity } from '@/types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';

import { updateForWhat } from '@/redux/slices/propSlice';
import { giveSeverityWithColor, giveTime } from '@/services/CommonServices';
import Loader from '../common/Loader';
import CreateIconCard from './cards/CreateIconCard';
import QuizFiltersCard from './cards/QuizFiltersCard';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import QuizCreateModal from './modals/QuizCreateModal';
import QuizEditModal from './modals/QuizEditModal';
import Pagination from './Pagination';


const QuizzesTable: React.FC = () => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
    const [currentDeleteId, setCurrectDeleteId] = useState<number | null>(null);
    const { quizzes, quizLoading } = useAppSelector((state: RootState) => state.quiz);
    const [quizzesData, setQuizzesData] = useState<Quiz[]>([...quizzes.content]);
    const dispatch = useAppDispatch();
    const [toggle, setToggle] = useState<boolean>(false);
    const [quiz, setQuiz] = useState<Quiz>({
        id: 0,
        title: '',
        description: '',
        quizPic: '/addPic.png',
        categoryId: 0,
        randomizeQuestions: true,
        timeLimit: 0,
        attemptedTimes: 0,
        createdAt: '',
        severity: Severity.BEGINNER,
    });
    const params = new URLSearchParams();
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

    useEffect(() => {
        prepareParams();
        dispatch(fetchQuizzesRequest(params.toString()))
        dispatch(updateForWhat("EducatorQuizzes"));
    }, [])

    useEffect(() => {
        prepareParams();
        dispatch(fetchQuizzesRequest(params.toString()))
    }, [filters, toggle]);

    useEffect(() => {
        setQuizzesData(quizzes.content);
    }, [quizzes]);

    const prepareParams = () => {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined)
                params.set(key, value.toString());
        });
        if (toggle)
            params.set("toggle", true + "");
    }

    const handleEdit = (quizId: number) => {
        const clickedQuiz = quizzesData.find((quiz: Quiz) => quiz.id === quizId) ?? quiz;
        setQuiz(clickedQuiz);
    };

    const handleDelete = async (id: number) => {
        setCurrectDeleteId(id);
    };

    const confirmDelete = () => {
        if (currentDeleteId)
            dispatch(deleteQuizRequest(currentDeleteId));
        setOpenConfirmBox(false);
    };

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        dispatch(fetchQuizzesRequest(params.toString()));
        setOpenEdit(false);
    }
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => {
        dispatch(fetchQuizzesRequest(params.toString()));
        setOpenCreateModal(false);
    }
    const handleOpenConfirmBox = () => setOpenConfirmBox(true);
    const handleCloseConfirmBox = () => setOpenConfirmBox(false);

    const applyFilters = (newFilters: Filters) => {
        setFilters({ ...newFilters, page: 0 });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters({
            ...filters,
            page: newPage,
        })
    };

    const applyToggle = () => {
        setToggle(!toggle);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setFilters({
            ...filters,
            size: newRowsPerPage,
            page: 0,
        });
    };

    const handleReset = () => {
        setFilters({ page: 0, size: 10, toggle: undefined });
        setToggle(false);
    }

    return (
        <>
            <Box className={styles.mainContainerOfTable}>
                <QuizFiltersCard
                    applyFilters={applyFilters}
                    applyToggle={applyToggle}
                    resetFilters={handleReset}
                    applyToggleVal={toggle}
                    children={<CreateIconCard
                        name='New Quiz'
                        handleOpen={handleOpenCreateModal}
                    />}
                />
                {quizLoading ? (<Loader />) :
                    <Box className={styles.tableBox}>
                        <TableContainer component={Paper} className={styles.tableContainer}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" className={styles.rowStyle}>Title</TableCell>
                                        <TableCell align="left" className={styles.rowStyle}>Description</TableCell>
                                        <TableCell align="left" className={styles.rowStyle}>Time</TableCell>
                                        <TableCell align="left" className={styles.rowStyle}>Severity</TableCell>
                                        <TableCell align="left" className={styles.rowStyle}>Category</TableCell>
                                        <TableCell align="center" className={styles.rowStyle}>Questions</TableCell>
                                        <TableCell align="center" className={styles.rowStyle}>Users Count</TableCell>
                                        <TableCell align="center" className={styles.rowStyle}>Test</TableCell>
                                        <TableCell align="right" className={styles.rowStyle}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quizzesData.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={10} align="center" className={styles.notAvailable}>
                                                Quiz Not Available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {quizzesData.map((quiz: Quiz) => (
                                        <TableRow key={quiz.id}>
                                            <Tooltip title={quiz.title} placement="top-start"
                                                enterDelay={300}
                                                componentsProps={{
                                                    tooltip: {
                                                        className: styles.toolTip,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row" align="left">
                                                    {quiz.title.substring(0, 20)}
                                                </TableCell>
                                            </Tooltip>
                                            <Tooltip title={quiz.description} placement="top-start"
                                                enterDelay={300}
                                                componentsProps={{
                                                    tooltip: {
                                                        className: styles.toolTip,
                                                    },
                                                }}
                                            >
                                                <TableCell align="left">{quiz.description.substring(0, 20)}</TableCell>
                                            </Tooltip>

                                            <TableCell align="left">{giveTime(quiz.timeLimit)}</TableCell>
                                            <TableCell align="left">
                                                <span style={{ color: giveSeverityWithColor(quiz).color }}>{quiz.severity}</span>
                                            </TableCell>
                                            <Tooltip title={quiz.category?.name} placement="top-start"
                                                enterDelay={300}
                                                componentsProps={{
                                                    tooltip: {
                                                        className: styles.toolTip,
                                                    },
                                                }}
                                            >
                                                <TableCell align="left">{quiz.category?.name.substring(0, 10)}</TableCell>
                                            </Tooltip>
                                            <TableCell align="center">{quiz.questions?.length}
                                            </TableCell>
                                            <TableCell align="center">{quiz.attemptedUserCount}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" size="small">
                                                    Test
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right" className={styles.tableActions}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        handleOpenEdit();
                                                        handleEdit(quiz.id);
                                                    }}
                                                    className={styles.editButton}
                                                >
                                                    <EditNoteIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        handleDelete(quiz.id);
                                                        handleOpenConfirmBox();
                                                    }}
                                                    className={styles.deleteButton}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                }
                <Pagination
                    page={filters.page ?? 0}
                    count={quizzes.totalElements}
                    rowsPerPage={filters.size ?? 10}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box >
            {
                openCreateModal && <QuizCreateModal openQuizModal={openCreateModal} handleClose={handleCloseCreateModal} />
            }
            {
                openEdit &&
                <QuizEditModal quiz={quiz} onClose={handleCloseEdit} />
            }
            {
                openConfirmBox &&
                <DeleteConfirmModal onClose={handleCloseConfirmBox} confirm={confirmDelete} />
            }
        </>
    )
}
export default QuizzesTable;
