import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createBookmarkRequest, resetBookmarkMessage, } from '@/redux/slices/bookmarkSlice';
import { updateQuizId } from '@/redux/slices/propSlice';
import { fetchQuizzesRequest, updateQuiz } from '@/redux/slices/quizSlice';
import { RootState } from '@/redux/store';
import { capitalizeWords, giveDate, giveSeverityWithColor, giveTime, isBase64 } from '@/services/CommonServices';
import styles from '@/styles/student/ListEducatorCatQuiz.module.css';
import { Filters, Quiz } from '@/types/types';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Loader from '../common/Loader';
import NotFound from '../common/NotFound';
import QuizFiltersCard from '../educator/cards/QuizFiltersCard';
import Pagination from '../educator/Pagination';
import NotAvailable from '../common/NotAvailable';

const ListAllQuiz: React.FC = () => {
  const { categoryId, creatorId, quizBy, forWhat } = useAppSelector((state: RootState) => state.props);
  const { bookmarkMessage, bookmarkError } = useAppSelector((state: RootState) => state.bookmark)
  const { quizzes, quizLoading } = useAppSelector((state: RootState) => state.quiz);
  const [quizzesData, setQuizzesData] = useState<Quiz[]>(quizzes.content);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = new URLSearchParams();
  const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

  useEffect(() => {
    prepareParams();
    dispatch(fetchQuizzesRequest(params.toString()));
  }, [])

  useEffect(() => {
    prepareParams();
    dispatch(fetchQuizzesRequest(params.toString()));
  }, [filters]);

  useEffect(() => {
    setQuizzesData(quizzes.content);
  }, [quizzes]);

  const prepareParams = () => {

    if (forWhat == 'StudentEducator')
      params.set('creatorId', creatorId.toString());

    else if (forWhat == 'StudentCategory')
      params.set('categoryId', categoryId.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined)
        params.set(key, value.toString());
    });
  }

  useEffect(() => {
    if (bookmarkMessage)
      toast.success(bookmarkMessage, { position: 'top-center', autoClose: 1000 });

    if (bookmarkError)
      toast.error(bookmarkError, { position: 'top-center' });

    dispatch(resetBookmarkMessage())
  }, [bookmarkMessage, bookmarkError])

  const startQuiz = (quiz: Quiz) => {
    dispatch(updateQuizId(quiz.id));
    dispatch(updateQuiz(quiz));
    router.push('/student/quizzes/start')
  };

  const applyFilters = (newFilters: Filters) => {
    setFilters({ ...newFilters, page: 0 });
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
      page: 0,
      size: newRowsPerPage,
    })
  };

  const handleReset = () => {

    if (forWhat == 'StudentEducator') {
      setFilters({ page: 0, size: 10, creatorId: creatorId, categoryId: undefined, query: undefined });
    }
    else if (forWhat == 'StudentCategory') {
      setFilters({ page: 0, size: 10, creatorId: undefined, categoryId: categoryId, query: undefined });
    }
    else setFilters({ page: 0, size: 10, query: undefined });
  }

  const handleBookmarkClick = (quizId: number) => {
    dispatch(createBookmarkRequest({
      id: -1,
      quizId: quizId,
      isBookmarked: false,
    }))
  };

  return (
    <>
      <Box className={styles.container}>
        <QuizFiltersCard
          applyFilters={applyFilters}
          resetFilters={handleReset}
          children={null}
          by={quizBy ?? ''}
        />
        {
          quizLoading == true ? <Loader />
            :
            <Box className={styles.cardsContainer}>
              {quizzesData.length === 0 && <NotAvailable />
              }
              <Box className={styles.cardContainer}>
                {quizzesData.map((quiz: Quiz) => {
                  if (quiz.questions?.length ?? 0 >= 1)
                    return (
                      <Card className={styles.card} key={quiz.id}
                      >
                        <CardActionArea>
                          <div style={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={isBase64(quiz.quizPic)}
                              alt={quiz.title}
                              sx={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <Box
                              onClick={() => handleBookmarkClick(quiz.id)}
                              sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                display: 'inline-block',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.7)',
                                  top: '15px',
                                },
                              }}
                            >
                              <BookmarkBorderIcon
                                style={{ fontSize: '20px' }}
                              />
                            </Box>
                          </div>
                          <CardContent>
                            <Tooltip title={quiz.title} placement="top"
                              enterDelay={300}
                              componentsProps={{
                                tooltip: {
                                  className: styles.toolTip,
                                },
                              }}>
                              <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                                {capitalizeWords(quiz.title)}
                              </Typography>
                            </Tooltip>
                            <Tooltip title={quiz.description} placement="top"
                              enterDelay={300}
                              componentsProps={{
                                tooltip: {
                                  className: styles.toolTip,
                                },
                              }}>
                              <Typography variant="body2" className={styles.cardBio}>
                                {quiz.description}
                              </Typography>
                            </Tooltip>

                            <Typography variant="subtitle2" color="text.secondary" className={styles.cardInfo}>
                              Time Limit: {giveTime(quiz.timeLimit)} | {quiz.questions?.length} Questions | <span style={{ color: giveSeverityWithColor(quiz).color }}>{quiz.severity}</span> | Created on : {giveDate(quiz.createdAt)}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', }}>
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                  backgroundColor: 'green',
                                  color: '#fff',
                                  textTransform: 'none',
                                }}
                                onClick={() => { startQuiz(quiz) }}
                              >
                                Start Quiz
                              </Button>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>)
                })}
              </Box>
            </Box>
        }
        <Box className={styles.paginationContainer}>
          <Pagination
            page={filters.page ?? 0}
            count={quizzes.totalElements}
            rowsPerPage={filters.size ?? 10}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box >

    </>
  );
};

export default ListAllQuiz;
