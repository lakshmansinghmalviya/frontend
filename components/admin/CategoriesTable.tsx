import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteCategoryRequest, fetchCategoriesRequest } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/educator/EducatorTable.module.css';
import { Category, Filters } from '@/types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Tooltip } from '@mui/material';
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
import CategoryFiltersCard from '../educator/cards/CategoryFiltersCard';
import CreateIconCard from '../educator/cards/CreateIconCard';
import CategoryCreateModal from '../educator/modals/CategoryCreateModal';
import CategoryEditModal from '../educator/modals/CategoryEditModel';
import Pagination from '../educator/Pagination';
import CategoryDeleteConfirmModal from '../educator/modals/DeleteConfirmModal';

const CategoriesTable: React.FC = () => {
    const { categories, category, categoryLoading } = useAppSelector((state: RootState) => state.category);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<Category>({ ...category });
    const [currentDeleteId, setCurrectDeleteId] = useState<number | null>(null);
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const params = new URLSearchParams();
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

    useEffect(() => {
        prepareParams();
        dispatch(fetchCategoriesRequest(params.toString()));
    }, []);

    useEffect(() => {
        prepareParams();
        dispatch(fetchCategoriesRequest(params.toString()));
    }, [filters]);

    useEffect(() => {
        setCategoriesData(categories.content);
    }, [categories]);

    const prepareParams = () => {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                params.set(key, value.toString());
            }
        });
    }

    const handleEdit = (categoryId: number) => {
        const clickedCategory = categoriesData.find((cat) => cat.id === categoryId);
        setEditCategory(clickedCategory ?? editCategory);
    };

    const handleDelete = async (id: number) => {
        setCurrectDeleteId(id);
    };

    const confirmDelete = () => {
        if (currentDeleteId)
            dispatch(deleteCategoryRequest(currentDeleteId));
        setOpenConfirmBox(false);
    };

    const handleOpen = () => setOpen(true);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);
    const handleClose = () => setOpen(false);
    const handleOpenConfirmBox = () => setOpenConfirmBox(true);
    const handleCloseConfirmBox = () => {
        setOpenConfirmBox(false);
    };

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

    const resetFilters = () => {
        setFilters({ page: 0, size: 10 });
    }

    return (
        <div>
            <Box className={styles.mainContainerOfTable}>
                <CategoryFiltersCard
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    children={<CreateIconCard handleOpen={handleOpenCreateModal} name='New Category' />}
                />
                {categoryLoading ? <Loader />
                    :
                    <>
                        <Box className={styles.tableBox}>
                            <TableContainer component={Paper} className={styles.tableContainer}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" className={styles.rowStyle}>Name</TableCell>
                                            <TableCell align="left" className={styles.rowStyle}>Description</TableCell>
                                            <TableCell align="center" className={styles.rowStyle}>Quizzes</TableCell>
                                            <TableCell align="right" className={styles.rowStyle}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (categoriesData.length === 0) &&
                                            <TableRow>
                                                <TableCell colSpan={3} align="center" className={styles.notAvailable}>
                                                    Category Not Available
                                                </TableCell>
                                            </TableRow>
                                        }

                                        {categoriesData.map((category) => (
                                            <TableRow key={category.id}>
                                                <Tooltip title={category.name} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row" align="left">
                                                        {category.name.substring(0, 20)}
                                                    </TableCell>
                                                </Tooltip>
                                                <Tooltip title={category.description} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="left">{category.description.substring(0, 20)}</TableCell>
                                                </Tooltip>
                                                <TableCell component="th" scope="row" align="center">
                                                    {category.quizzes?.length}
                                                </TableCell>
                                                <TableCell align="right" className={styles.tableActions}>
                                                    <IconButton color="primary" onClick={() => {
                                                        handleOpen();
                                                        handleEdit(category.id);
                                                    }}
                                                        className={styles.editButton}
                                                    >
                                                        <EditNoteIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary" onClick={() => {
                                                        handleDelete(category.id);
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
                                count={categories.totalElements}
                                rowsPerPage={filters.size ?? 10}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </>
                }
            </Box>
            {openCreateModal && <CategoryCreateModal onClose={handleCloseCreateModal} />}
            {open && <CategoryEditModal category={editCategory} onClose={handleClose} />
            }
            {openConfirmBox &&
                <CategoryDeleteConfirmModal onClose={handleCloseConfirmBox}
                    confirm={confirmDelete}
                />
            }
        </div >
    );
};

export default CategoriesTable;
