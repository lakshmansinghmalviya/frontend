import style from '@/styles/educator/CatQuizQuestionRow.module.css';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface CreateCardIconProps {
    handleOpen?: () => void;
    name?: string;
}

const CreateIconCard: FC<CreateCardIconProps> = ({ handleOpen, name }) => {
    return (
        <Box className={style.newContainer}
            onClick={handleOpen}
        >
            <IconButton>
                <AddIcon className={style.addIcon} />
            </IconButton>
            <Typography className={style.newText}>
                {name}
            </Typography>
        </Box>
    )
}

export default CreateIconCard