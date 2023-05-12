import { FC } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import Typography from '@mui/material/Typography';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Block } from "../components/Block";

export const HomePage: FC = () => {
    const theme = useTheme();
    const [uId, setUID] = useLocalStorage<string | undefined>('uid', undefined);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                '& > :not(style)': {
                    width: 1,
                    height: 'fit-content',
                    padding: '20px',
                    mb: '30px',
                    borderRadius: 3,
                },
            }}>
            <Block>
                <Typography variant="h5" component="h1">
                    Трекер работы
                    <InsightsIcon sx={{ ml: 2, fontSize: '30px', mb: -0.7 }} />
                </Typography>
            </Block>
            <Block
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                gap: 3,
                '& > :not(style)': {
                    textTransform: 'none',
                    fontSize: matches ? '17px' : '16px',
                    borderRadius: 2,
                },
            }}>
                <Button
                    href="https://t.me/Treker_Raboty_Bot"
                    variant="contained"
                    color="primary"
                    disabled={false}
                    size="large">
                    Запустить бота
                    <MoreTimeOutlinedIcon sx={{
                        ml: 2
                    }} />
                </Button>
                <Button
                    href={uId ? `/user/${uId}` : '/user'}
                    variant="contained"
                    color="primary"
                    disabled={false}
                    size="large">
                    Посмотреть статистику
                    <TrendingUpRoundedIcon sx={{
                        ml: 2
                    }} />
                </Button>
                <Button
                    href="#"
                    variant="outlined"
                    color="primary"
                    disabled={false}
                    size="large">
                    Перейти в чат проекта
                    <ForumRoundedIcon sx={{
                        ml: 2
                    }} />
                </Button>
            </Block>
        </Box>
    );

};