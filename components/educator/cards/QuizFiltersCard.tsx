import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategoriesRequest } from '@/redux/slices/categorySlice';
import { updateCategoryId } from '@/redux/slices/propSlice';
import { RootState } from '@/redux/store';
import { bookmarkSortingOptions, quizSortingOptions } from '@/services/CommonServices';
import style from '@/styles/educator/CatQuizQuestionRow.module.css';
import { Category, Filters, Severity, SortingOption } from '@/types/types';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DateRange, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react';



interface QuizFiltersCardProps {
    applyFilters: (filters: Filters) => void;
    resetFilters: () => void;
    children: ReactNode;
    by?: string;
    name?: string;
    applyToggle?: () => void;
    applyToggleVal?: boolean;
}

const QuizFiltersCard: React.FC<QuizFiltersCardProps> = ({ applyFilters, resetFilters, children, by, name, applyToggle, applyToggleVal }) => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state: RootState) => state.category);
    const { quizBy, creatorId, forWhat } = useAppSelector((state: RootState) => state.props);
    const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });
    const [selectedSortings, setSelectedSortings] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

    useEffect(() => {
        dispatch(fetchCategoriesRequest(""))
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

    const handleChange = (event: SelectChangeEvent<number | string | boolean | Severity>, field: keyof Filters) => {
        const selectedValue = event.target.value;
        setFilters({
            ...filters,
            [field]: selectedValue,
        });
    };

    const handleReset = () => {
        if (forWhat == 'StudentEducator') {
            setFilters({ page: 0, size: 10, creatorId: creatorId, categoryId: undefined, severity: undefined, query: '' });
        }
        else if (forWhat == 'StudentCategory') {
            setFilters({ page: 0, size: 10, creatorId: undefined, categoryId: undefined, severity: undefined, query: '' });
        }
        else setFilters({ page: 0, size: 10, severity: undefined, query: '' });
        setSelectedSortings([]);
        setDateRange([null, null]);
        resetFilters();
    };

    return (
        <>
            <Box className={style.container}>
                <Typography variant="h6" className={style.title}>
                    {name && <div>{name}</div>}
                    {
                        by != undefined ? by.trim().length !== 0 ? <div> {by}'s Quizzes</div> : 'Quizzes' : 'Quizzes'
                    }
                </Typography>

                <Box className={style.controlsContainer}>
                    <TextField
                        placeholder="Search"
                        label={
                            <Box className={style.searchLabel}>
                                <SearchIcon className={style.searchIcon} />
                                Search Quiz
                            </Box>
                        }
                        variant="outlined"
                        size="small"
                        className={style.searchField}
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
                            {(by == 'Bookmark' ? bookmarkSortingOptions : quizSortingOptions).map((option: SortingOption) => (
                                <MenuItem key={option.id} value={option.id}>
                                    <Checkbox checked={selectedSortings.includes(option.id)} />
                                    <ListItemText primary={option.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        forWhat != 'StudentCategory' &&
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                            <InputLabel id="categoryId">Category</InputLabel>
                            <Select
                                name="categoryId"
                                labelId="categoryId"
                                onChange={(e) => {
                                    dispatch(updateCategoryId({ categoryId: e.target.value as number, name: quizBy ?? '' }))
                                    handleChange(e, 'categoryId')
                                }}
                                value={filters.categoryId ?? ''}
                                label="Category"
                            >
                                {categories.content.map((category: Category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                    <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                        <InputLabel id="timeLimit">Time Limit</InputLabel>
                        <Select
                            name="timeLimit"
                            labelId="timeLimit"
                            onChange={(e) => handleChange(e, 'timeLimit')}
                            value={filters.timeLimit ?? ''}
                            label="Time Limit"
                        >
                            <MenuItem value={10}>less than 10 m</MenuItem>
                            <MenuItem value={20}>less than 20 m</MenuItem>
                            <MenuItem value={50}>less than 50 m</MenuItem>
                            <MenuItem value={70}>less than 70 m</MenuItem>
                            <MenuItem value={100}>less than 100 m</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                        <InputLabel>Severity</InputLabel>
                        <Select
                            name="severity"
                            value={filters.severity as Severity ?? ''}
                            onChange={(e) => handleChange(e, 'severity')}
                            label="severity"
                        >
                            <MenuItem value={Severity.HARD}>Hard</MenuItem>
                            <MenuItem value={Severity.MEDIUM}>Medium</MenuItem>
                            <MenuItem value={Severity.BEGINNER}>Beginner</MenuItem>
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
                    <Box>
                        {
                            forWhat == 'EducatorQuizzes' &&
                            <Button variant="contained" size="medium" className={style.applyButton} onClick={applyToggle}>
                                {applyToggleVal ? `Yours` : 'All'}
                            </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default QuizFiltersCard;

