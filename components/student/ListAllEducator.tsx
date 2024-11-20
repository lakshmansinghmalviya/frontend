import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateCreatorId, updateForWhat } from '@/redux/slices/propSlice';
import { fetchUsersRequest } from '@/redux/slices/usersSlice';
import { RootState } from '@/redux/store';
import { capitalizeWords, isBase64 } from '@/services/CommonServices';
import styles from '@/styles/student/ListEducatorCatQuiz.module.css';
import { Filters, Role, User } from '@/types/types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import NotAvailable from '../common/NotAvailable';
import Pagination from '../educator/Pagination';
import EducatorFiltersCard from './cards/EducatorFiltersCard';


const ListAllEducator: React.FC = () => {
    const { users, userLoading } = useAppSelector((state: RootState) => state.user);
    const [usersData, setUsersData] = useState<User[]>([]);
    const dispatch = useAppDispatch();
    const router = useRouter();
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

    const handleSelected = (creatorId: number, name: string) => {
        dispatch(updateForWhat("StudentEducator"));
        dispatch(updateCreatorId({ creatorId: creatorId, name: name }));
        router.push('/student/quizzes');
    };

    const applyFilters = (newFilters: Filters) => {
        setFilters({ ...newFilters, role: Role.EDUCATOR, page: 0 });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters({
            ...filters,
            page: newPage,
        })
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setFilters({
            ...filters,
            size: newRowsPerPage,
            page: 0,
        })
    };

    const resetFilters = () => {
        setFilters({ page: 0, size: 10 });
    }

    return (
        <>
            <Box className={styles.container}>
                <EducatorFiltersCard
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    name='Educators'
                />
                {userLoading ? (
                    <Loader />
                ) :
                    <Box className={styles.cardsContainer}>
                        {usersData.length === 0 && <NotAvailable />
                        }
                        <Box className={styles.cardContainer}>
                            {usersData.map((educator: User) => {

                                if (educator.isApproved ?? false)
                                    return (
                                        <Card
                                            key={educator.id}
                                            sx={cardDesign}
                                            onClick={() => handleSelected(educator.id, educator.name)}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={isBase64(educator.profilePic)}
                                                    alt={educator.name}
                                                    className={styles.cardMedia}
                                                />
                                                <CardContent>
                                                    <Tooltip title={educator.name} placement="top-start"
                                                        enterDelay={300}
                                                        componentsProps={{
                                                            tooltip: {
                                                                className: styles.toolTip,
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            component="div"
                                                            className={styles.cardTitle}
                                                        >
                                                            {capitalizeWords(educator.name)}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Tooltip title={educator.bio} placement="top"
                                                        enterDelay={300}
                                                        componentsProps={{
                                                            tooltip: {
                                                                className: styles.toolTip,
                                                            },
                                                        }}>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.primary"
                                                            className={`${styles.cardBio}`}
                                                        >
                                                            <strong>Bio:</strong>   {educator.bio || 'No bio available'}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Tooltip title={educator.education} placement="top"
                                                        enterDelay={300}
                                                        componentsProps={{
                                                            tooltip: {
                                                                className: styles.toolTip,
                                                            },
                                                        }}>
                                                        <Typography variant="body2" color="text.primary" className={styles.cardBio}>
                                                            <strong>Education:</strong> {educator.education || 'Not provided'}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography variant="body2" color="text.secondary" className={styles.cardInfo}>
                                                        <strong>Quizzes Created:</strong> {educator.quizzes?.length}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    )
                            })}
                        </Box>
                    </Box>
                }
                <Box className={styles.paginationContainer}>
                    <Pagination
                        page={filters.page ?? 0}
                        count={users.totalElements}
                        rowsPerPage={filters.size ?? 10}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ListAllEducator;


const cardDesign = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '250px',
    height: '300px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
};
