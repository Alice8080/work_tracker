import { FC } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

export const Error: FC = () => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Alert severity="error" sx={{ borderRadius: 3 }}>
                <AlertTitle>При загрузке данных произошла ошибка</AlertTitle>
                Попробуйте перезагрузить страницу
            </Alert>
        </Stack>
    )
}