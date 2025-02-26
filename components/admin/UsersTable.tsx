import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteUserRequest, fetchUsersRequest } from '@/redux/slices/usersSlice';
import { RootState } from '@/redux/store';
import { checkApproval } from '@/services/CommonServices';
import styles from '@/styles/educator/EducatorTable.module.css';
import { Filters, Role, User } from '@/types/types';
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
import CreateIconCard from '../educator/cards/CreateIconCard';
import DeleteConfirmModal from '../educator/modals/DeleteConfirmModal';
import Pagination from '../educator/Pagination';
import EducatorFiltersCard from '../student/cards/EducatorFiltersCard';
import CreateUserByAdmin from './modals/CreateUserByAdmin';
import EditUserProfileByAdminModal from './modals/EditUserProfileByAdmin';

const UsersTable: React.FC = () => {
    const { users, user, userLoading } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<User>({ ...user });
    const [currentDeleteId, setCurrectDeleteId] = useState<number | null>(null);
    const [usersData, setUsersData] = useState<User[]>([]);
    const params = new URLSearchParams();
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

    useEffect(() => {
        prepareParams();
        dispatch(fetchUsersRequest(params.toString()));
    }, []);

    useEffect(() => {
        prepareParams();
        dispatch(fetchUsersRequest(params.toString()));
    }, [filters]);

    useEffect(() => {
        setUsersData(users.content);
    }, [users]);

    const prepareParams = () => {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                params.set(key, value.toString());
            }
        });
    }

    const handleEdit = (userId: number) => {
        const clickeduser = usersData.find((user) => user.id === userId);
        setEditUser(clickeduser ?? editUser);
    };

    const handleDelete = async (id: number) => {
        setCurrectDeleteId(id);
    };

    const confirmDelete = () => {
        if (currentDeleteId)
            dispatch(deleteUserRequest(currentDeleteId));
        setOpenConfirmBox(false);
    };

    const handleOpenEdit = () => setOpenEdit(true);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);
    const handleCloseEdit = () => setOpenEdit(false);
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
                <EducatorFiltersCard
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    name='Users'
                    children={<CreateIconCard
                        name='New User'
                        handleOpen={handleOpenCreateModal}
                    />}
                />
                {userLoading ? <Loader />
                    :
                    <>
                        <Box className={styles.tableBox}>
                            <TableContainer component={Paper} className={styles.tableContainer}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" className={styles.rowStyle}>Name</TableCell>
                                            <TableCell align="left" className={styles.rowStyle}>Email</TableCell>
                                            <TableCell align="left" className={styles.rowStyle}>Bio</TableCell>
                                            <TableCell align="left" className={styles.rowStyle}>Education</TableCell>
                                            <TableCell align="left" className={styles.rowStyle}>Role</TableCell>
                                            <TableCell align="center" className={styles.rowStyle}>Approval</TableCell>
                                            <TableCell align="right" className={styles.rowStyle}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (usersData.length === 0) &&
                                            <TableRow>
                                                <TableCell colSpan={10} align="center" className={styles.notAvailable}>
                                                    User Not Available
                                                </TableCell>
                                            </TableRow>
                                        }

                                        {usersData.map((user: User) => (
                                            <TableRow key={user.id}>
                                                <Tooltip title={user.name} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row" align="left">
                                                        {user.name.substring(0, 15)}
                                                    </TableCell>
                                                </Tooltip>
                                                <Tooltip title={user.email} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="left" style={{ color: 'gray' }}>{user.email.substring(0, 20)}</TableCell>
                                                </Tooltip>
                                                <Tooltip title={user.bio} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="left">{user?.bio?.substring(0, 20)}</TableCell>
                                                </Tooltip>
                                                <Tooltip title={user.education} placement="top"
                                                    enterDelay={300}
                                                    componentsProps={{
                                                        tooltip: {
                                                            className: styles.toolTip,
                                                        },
                                                    }}
                                                >
                                                    <TableCell align="left">{user?.education?.substring(0, 20)}</TableCell>
                                                </Tooltip>
                                                <TableCell align="left">{user.role}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        color: checkApproval(user) === 'Approved' ? 'green' : (checkApproval(user) === 'Pending' ? 'red' : 'inherit')
                                                    }}
                                                >
                                                    {user.role == Role.STUDENT ? 'No Need' : ''}
                                                    {checkApproval(user)}
                                                </TableCell>
                                                <TableCell align="right" className={styles.tableActions}>
                                                    <IconButton color="primary" onClick={() => {
                                                        handleOpenEdit();
                                                        handleEdit(user.id);
                                                    }}
                                                        className={styles.editButton}
                                                    >
                                                        <EditNoteIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary" onClick={() => {
                                                        handleDelete(user.id);
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
                                count={users.totalElements}
                                rowsPerPage={filters.size ?? 10}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </>
                }
            </Box>
            {openCreateModal && <CreateUserByAdmin onClose={handleCloseCreateModal} />}
            {
                openEdit &&
                <EditUserProfileByAdminModal
                    user={editUser}
                    handleClose={handleCloseEdit}
                />
            }

            {openConfirmBox &&
                <DeleteConfirmModal onClose={handleCloseConfirmBox} confirm={confirmDelete} />
            }
        </div >
    );
};

export default UsersTable;
