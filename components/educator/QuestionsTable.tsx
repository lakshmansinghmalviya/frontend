import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteQuestionRequest, fetchQuestionsRequest } from '@/redux/slices/questionSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/educator/EducatorTable.module.css';
import { Filters, Question } from '@/types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import CreateIconCard from './cards/CreateIconCard';
import QuestionFiltersCard from './cards/QuestionFiltersCard';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import QuestionCreateModal from './modals/QuestionCreateModal';
import QuestionEditModal from './modals/QuestionEditModal';
import Pagination from './Pagination';
import { Tooltip } from '@mui/material';

const QuestionsTable: React.FC = () => {
    const { questions, question, questionLoading } = useAppSelector((state: RootState) => state.question);
    const [open, setOpen] = useState<boolean>(false);
    const [openQuestionModal, setOpenQuestionModal] = useState<boolean>(false);
    const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
    const [editQuestion, setEditQuestion] = useState<Question>({ ...question });
    const [currentDeleteId, setCurrectDeleteId] = useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [questionsData, setQuestionsData] = useState<Question[]>([]);
    const dispatch = useAppDispatch();
    const params = new URLSearchParams();
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

    useEffect(() => {
        prepareParams();
        dispatch(fetchQuestionsRequest(params.toString()));
    }, []);

    useEffect(() => {
        prepareParams();
        dispatch(fetchQuestionsRequest(params.toString()));
    }, [filters]);

    useEffect(() => {
        if (questions) setQuestionsData([...questions.content]);
    }, [questions]);

    const prepareParams = () => {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                params.set(key, value.toString());
            }
        });
    }

    const handleEdit = (questionsId: number) => {
        const clickedQuestion = questionsData.find((question: Question) => question.id === questionsId);
        setEditQuestion(clickedQuestion ?? question);
    };

    const handleDelete = async (id: number) => {
        setCurrectDeleteId(id);
    };

    const confirmDelete = () => {
        if (currentDeleteId) dispatch(deleteQuestionRequest(currentDeleteId));
        setOpenConfirmBox(false);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenQuestionModal = () => setOpenQuestionModal(true);
    const handleCloseQuestionModal = () => setOpenQuestionModal(false);
    const handleOpenConfirmBox = () => setOpenConfirmBox(true);
    const handleCloseConfirmBox = () => setOpenConfirmBox(false);

    const applyFilters = (newFilters: Filters) => {
        setFilters({ ...newFilters, page: 0 });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters({ ...filters, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setFilters({ ...filters, size: newRowsPerPage, page: 0 });
    };

    const handleReset = () => {
        setFilters({ page: 0, size: 10 });
    }

    return (
        <div>
            <Box className={styles.mainContainerOfTable}>
                <QuestionFiltersCard
                    applyFilters={applyFilters}
                    resetFilters={handleReset}
                    children={<CreateIconCard
                        name='New Question'
                        handleOpen={handleOpenQuestionModal}
                    />}
                />

                {questionLoading ? (
                    <Loader />
                ) :
                    <Box className={styles.tableBox}>
                        <TableContainer component={Paper} className={styles.tableContainer}>
                            <Table stickyHeader sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" className={styles.rowStyle}>Question</TableCell>
                                        <TableCell align="left" className={styles.rowStyle}>Option Count</TableCell>
                                        <TableCell align="center" className={styles.rowStyle}>Marks</TableCell>
                                        <TableCell align="center" className={styles.rowStyle}>Quiz</TableCell>
                                        <TableCell align="right" className={styles.rowStyle}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questionsData.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" className={styles.notAvailable}>
                                                No Questions Available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {questionsData.map((question: Question, index: number) => (
                                        <TableRow key={question.id}>
                                            <Tooltip title={question.text} placement="top"
                                                enterDelay={300}
                                                componentsProps={{
                                                    tooltip: {
                                                        className: styles.toolTip,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row" align="left">
                                                    {question.text.substring(0, 20)}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="left">{question.questionType}</TableCell>
                                            <TableCell align="center">{question.maxScore}</TableCell>
                                            <Tooltip title={question.quiz?.title} placement="top" enterDelay={300}
                                                componentsProps={{
                                                    tooltip: {
                                                        className: styles.toolTip,
                                                    },
                                                }}>
                                                <TableCell align="center">{question.quiz?.title.substring(0, 20)}</TableCell>
                                            </Tooltip>
                                            <TableCell align="right" className={styles.tableActions}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        handleOpen();
                                                        handleEdit(question.id);
                                                        setClickedIndex(index);
                                                    }}
                                                    className={styles.editButton}
                                                >
                                                    <EditNoteIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        handleDelete(question.id);
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
                        <Pagination
                            page={filters.page ?? 0}
                            count={questions.totalElements}
                            rowsPerPage={filters.size ?? 10}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                }
            </Box>
            {
                openQuestionModal &&
                <QuestionCreateModal
                    onClose={handleCloseQuestionModal}
                />
            }

            {open &&
                <QuestionEditModal question={editQuestion} onClose={handleClose} index={clickedIndex + 1} />
            }

            {openConfirmBox &&
                <DeleteConfirmModal onClose={handleCloseConfirmBox} confirm={confirmDelete} />
            }
        </div >
    );
};

export default QuestionsTable;
