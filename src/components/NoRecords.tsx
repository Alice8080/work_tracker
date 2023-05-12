import { FC } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export const NoRecords: FC = () => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Alert severity="info" sx={{ borderRadius: 3 }}>
                <AlertTitle>Пока что у вас нет записанных дел</AlertTitle>
                Запустите бота, чтобы начать отслеживать свою статистику
            </Alert>
        </Stack>
    )
}