import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategoriesRequest } from '@/redux/slices/categorySlice';
import { updateCategoryId, updateForWhat } from '@/redux/slices/propSlice';
import { RootState } from '@/redux/store';
import { capitalizeWords, isBase64 } from '@/services/CommonServices';
import styles from '@/styles/student/ListEducatorCatQuiz.module.css';
import { Category, Filters } from '@/types/types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import NotFound from '../common/NotFound';
import CategoryFiltersCard from '../educator/cards/CategoryFiltersCard';
import Pagination from '../educator/Pagination';
import NotAvailable from '../common/NotAvailable';

const ListAllCategory: React.FC = () => {
  const { categories, categoryLoading } = useAppSelector((state: RootState) => state.category);
  const [categoriesData, setCategoriesData] = useState<Category[]>([...categories.content]);
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const handleSelected = (categoryId: number, name: string) => {
    dispatch(updateForWhat("StudentCategory"));
    dispatch(updateCategoryId({ categoryId: categoryId, name: name }));
    router.push('/student/quizzes');
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
        <CategoryFiltersCard
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          children={null}
        />
        {categoryLoading ? <Loader />
          :
          <Box className={styles.cardsContainer}>
            {categoriesData.length === 0 && <NotAvailable />
            }
            <Box className={styles.cardContainer}>
              {categoriesData.map((category: Category) => (
                <Card key={category.id}
                  className={styles.card}
                  onClick={() => { handleSelected(category.id, category.name) }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={isBase64(category.categoryPic)}
                      alt={category.name}
                      className={styles.cardMedia}
                    />
                    <CardContent>
                      <Tooltip title={category.name} placement="top-start"
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
                          {capitalizeWords(category.name)}
                        </Typography>
                      </Tooltip>
                      <Tooltip title={category.description} placement="top-start"
                        enterDelay={300}
                        componentsProps={{
                          tooltip: {
                            className: styles.toolTip,
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.primary"
                          className={styles.cardBio}
                        >
                          {category.description}
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" color="text.secondary" className={styles.cardInfo}>
                        <strong>Quizzes Available:</strong> {category.quizzes?.length}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        }
        <Box className={styles.paginationContainer}>
          <Pagination
            page={filters.page ?? 0}
            count={categories.totalElements}
            rowsPerPage={filters.size ?? 10}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
};

export default ListAllCategory;
