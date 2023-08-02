import { FC } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TelegramLoginButton from 'react-telegram-login';

export const NoUser: FC = () => {
    const handleTelegramResponse = (response: any): void => {
        localStorage.setItem('user', JSON.stringify(response));
        window.location.reload();
    };
    return (
        <Box sx={{ textAlign: 'center', width: 1, p: 2 }}>
            <Typography fontSize={18} component="h2" sx={{ mb: 4 }}>
                Авторизуйтесь, чтобы посмотреть свою статистику
            </Typography>
            <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="Treker_Raboty_Bot" lang="ru" />
        </Box>
    )
}