import { FC } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const NoUser: FC = () => {
    return (
        <Box sx={{ textAlign: 'center', width: 1, p: 2 }}>
            <Typography fontSize={18} component="h2" sx={{ mb: 4 }}>
                Авторизуйтесь, чтобы посмотреть свою статистику
            </Typography>
            <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="w_tracker_bot" data-size="large" data-onauth="localStorage.setItem('user', JSON.stringify(user));window.location.reload();" data-request-access="write"></script>
        </Box>
    )
}