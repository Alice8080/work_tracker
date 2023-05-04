import { FC } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export const Page404: FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
            }}>
            <Paper elevation={3} sx={{
                borderRadius: 3,
                width: 1,
                p: 3
            }}>
                <Typography variant="h4" component="h1">
                    Ошибка 404
                    <ErrorOutlineRoundedIcon fontSize='large' sx={{ ml: 2, mb: -0.5 }} />
                </Typography>
                <Typography variant="h6" component="h1" sx={{color: 'text.secondary', mt: 3}}>
                    Такой страницы не существует
                </Typography>
            </Paper>
        </Box>
    );
}
