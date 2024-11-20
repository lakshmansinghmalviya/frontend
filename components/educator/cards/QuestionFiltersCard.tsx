import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateQuizId } from '@/redux/slices/propSlice';
import { fetchQuizzesRequest } from '@/redux/slices/quizSlice';
import { RootState } from '@/redux/store';
import { questionSortingOptions } from '@/services/CommonServices';
import style from '@/styles/educator/CatQuizQuestionRow.module.css';
import { Filters, Quiz, SortingOption } from '@/types/types';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DateRange, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react';


interface QuestionFiltersCardProps {
    applyFilters: (filters: Filters) => void;
    resetFilters: () => void;
    children: ReactNode;
}

const QuestionFiltersCard: React.FC<QuestionFiltersCardProps> = ({ applyFilters, resetFilters, children }) => {
    const { quizzes } = useAppSelector((state: RootState) => state.quiz)
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 5 });
    const [selectedSortings, setSelectedSortings] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchQuizzesRequest(""))
    }, []);

    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sort: selectedSortings.toString(),
        }));
    }, [selectedSortings]);

    useEffect(() => {
        handleApply();
    }, [filters])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilters({
            ...filters,
            query: e.target.value,
        });
    };

    const handleDateChange = (newValue: DateRange<Dayjs>) => {
        setDateRange(newValue);
        const start = newValue[0]?.format('DD-MM-YYYY') ?? '';
        const end = newValue[1]?.format('DD-MM-YYYY') ?? '';
        setFilters((prevFilters) => ({
            ...prevFilters, start: start, end: end
        }));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleApply();
        }
    };

    const handleApply = () => {
        applyFilters(filters);
    };

    const handleSortingOptionChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValue = event.target.value;
        const newSortings: string[] = typeof selectedValue === 'string' ? selectedValue.split(',') : selectedValue;

        const updatedSortings: string[] = newSortings.reduce<string[]>((acc, sorting) => {
            const field = sorting.split(':')[0];
            const isDescending = sorting.endsWith('desc');
            const oppositeSorting = isDescending ? `${field}:asc` : `${field}:desc`;
            const existingSort = acc.find(s => s.startsWith(field));
            if (existingSort) {
                acc = acc.filter(s => s !== existingSort && s !== oppositeSorting);
            }
            acc.push(sorting);
            return acc;
        }, []);

        setSelectedSortings(updatedSortings);
    };

    const handleChange = (event: SelectChangeEvent<number | string | boolean>, field: keyof Filters) => {
        const selectedValue = event.target.value;
        setFilters({
            ...filters,
            [field]: selectedValue,
        });
    };

    const handleReset = () => {
        dispatch(updateQuizId(-1))
        setFilters({ page: 0, size: 5, query: '', categoryId: undefined, timeLimit: undefined });
        setSelectedSortings([]);
        setDateRange([null, null]);
        resetFilters();
    };

    return (
        <>

            <Box className={style.container}>
                <Typography variant="h6" className={style.title}>
                    Questions
                </Typography>

                <Box className={style.controlsContainer}>
                    <TextField
                        placeholder="Search"
                        label={
                            <Box className={style.searchLabel}>
                                <SearchIcon className={style.searchIcon} />
                                Search Question
                            </Box>
                        }
                        variant="outlined"
                        size="small"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={filters.query}
                    />
                    <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                        <InputLabel id="sortby">Sort by</InputLabel>
                        <Select
                            labelId="sortby"
                            id="checkbox"
                            multiple
                            value={selectedSortings}
                            onChange={handleSortingOptionChange}
                            input={<OutlinedInput label="Apply Sorting" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {questionSortingOptions.map((option: SortingOption) => (
                                <MenuItem key={option.id} value={option.id}>
                                    <Checkbox checked={selectedSortings.includes(option.id)} />
                                    <ListItemText primary={option.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                        <InputLabel id="quizId">Quiz</InputLabel>
                        <Select
                            name="quizId"
                            labelId="quizId"
                            onChange={(e) => {
                                dispatch(updateQuizId(e.target.value as number))
                                handleChange(e, 'quizId')
                            }
                            }
                            value={filters.quizId ?? ''}
                            label="Quiz"
                        >
                            {quizzes.content.map((quiz: Quiz) => (
                                <MenuItem key={quiz.id} value={quiz.id}>
                                    {quiz.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            slotProps={{ textField: { size: 'small' } }}
                            className={style.datePicker}
                            onChange={handleDateChange}
                            slots={{ field: SingleInputDateRangeField }}
                            label={'Pick date range from - to'}
                            value={dateRange}
                        />
                    </LocalizationProvider>
                    <Box>
                        <Button variant="outlined" size="medium" className={style.resetButton} onClick={handleReset}>
                            Reset
                        </Button>
                    </Box>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default QuestionFiltersCard