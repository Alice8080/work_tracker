import { FC } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';

export const NoUser: FC = () => {
    return (
        <Box sx={{ textAlign: 'center', width: 1 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
                Запустите бота, чтобы посмотреть свою статистику
            </Typography>
            <Button
                href="#"
                variant="contained"
                color="primary"
                disabled={false}
                size="large"
                sx={{
                    textTransform: 'none',
                    mr: 5,
                    fontSize: 18,
                    borderRadius: 3,
                }}>
                Запустить бота
                <MoreTimeOutlinedIcon sx={{
                    ml: 2
                }} />
            </Button>
        </Box>
    )
}