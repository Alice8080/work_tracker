import { FC } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import Stack from '@mui/material/Stack';
import { Block } from "./Block";

export const NoRecords: FC = () => {
    return (
        <Block sx={{ width: '100%', textAlign: 'center' }}>
            <Typography fontSize={19} component="h2" sx={{ mb: 4 }}>
                Пока что у вас нет записанных дел. Запустите бота, чтобы посмотреть свою статистику
            </Typography>
            <Button
                href="https://t.me/Treker_Raboty_Bot"
                variant="contained"
                color="primary"
                disabled={false}
                size="medium"
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
        </Block>
    )
}