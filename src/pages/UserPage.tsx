import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { FormHelperText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { Divider } from "@mui/material";
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

import { useLazyGetUserInfoQuery } from "../api/apiSlice";
import { ProgressBar } from "../components/ProgressBar";
import { Error } from "../components/Error";
import { Record, RecordsList } from "../api/apiSlice";
import BarChart from "../components/BarChart";
import { Block } from "../components/Block";

const ChartContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 6,
}));

export const UserPage: FC = () => {
    const [getUserInfo,
        { data: recordsList,
            isLoading,
            isFetching,
            isSuccess,
            isError
        }] = useLazyGetUserInfoQuery();

    const params = useParams();
    const userId: string | undefined = params.id;
    const [uId, setUID] = useLocalStorage<string | undefined>('uid', undefined);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (userId) {
            getUserInfo(userId);
            if (isSuccess) {
                setUID(userId);
            }
        }
    }, [userId]);

    const [time, setTime] = useState('all');
    const handleChange = (event: SelectChangeEvent) => {
        setTime(event.target.value as string);
    };

  

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
            }}>
            <Block sx={{
                borderRadius: 3,
                width: 1,
            }}>
                <Typography variant="h4" component="h1">
                    Статистика активности
                    <AutoGraphIcon fontSize='large' sx={{ ml: 2, mb: -1 }} />
                </Typography>
            </Block>
            <Paper sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                width: 1,
                borderRadius: 3,
                mt: 2,
                padding: matches ? '5px' : '20px',
                border: matches ? 0 : 1,
                borderColor: 'secondary.dark',
                mb: 4
            }}>
                {isLoading || isFetching ?
                    <ProgressBar />
                    : isError ?
                        <Error />
                        : isSuccess && !recordsList ?
                            <Stack sx={{ width: '100%' }}>
                                <Alert severity="info" sx={{ borderRadius: 3 }}>
                                    <AlertTitle>Пока что у вас нет записанных дел</AlertTitle>
                                    Запустите бота, чтобы начать отслеживать свою статистику
                                </Alert>
                            </Stack>
                            : isSuccess && recordsList && recordsList.length > 0 ?
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2 }} >
                                    <Grid item xs={12} lg={9} sx={{ w: 1, h: 1 }}>
                                        <Block
                                            sx={{ width: 1, height: 1, padding: matches ? '5px' : '20px', }}>
                                            <BarChart recordsList={recordsList} />
                                        </Block>
                                    </Grid>

                                    <Grid item xs={12} lg={3}>
                                        <Grid container spacing={{ xs: 2 }}>
                                            <Grid item xs={12}>
                                                <Block sx={{ textAlign: 'center' }}>
                                                    <FormControl fullWidth sx={{
                                                        mb: 2
                                                    }}>
                                                        <InputLabel id="demo-simple-select-label">Выберите период</InputLabel>
                                                        <Select
                                                            sx={{ fontSize: '14px', mb: 2 }}
                                                            value={time}
                                                            onChange={handleChange}
                                                            label='Выберите период ;;;;'
                                                            inputProps={{ 'aria-label': 'Without label' }}>
                                                            <MenuItem value="all">Все время</MenuItem>
                                                            <MenuItem value='month'>Последний месяц</MenuItem>
                                                            <MenuItem value='week'>Последняя неделя</MenuItem>
                                                        </Select>
                                                        <TextField
                                                            label="Введите название дела"
                                                            defaultValue=""
                                                            sx={{ mb: 1 }}
                                                        />
                                                        <FormHelperText>По умолчанию на графике отображается общее время всех дел в часах</FormHelperText>
                                                    </FormControl>
                                                    <Button
                                                        href="#"
                                                        variant="outlined"
                                                        disabled={false}
                                                        size="large"
                                                        sx={{ ml: 'auto' }}>
                                                        Найти
                                                        <SearchIcon sx={{
                                                            ml: 2
                                                        }} />
                                                    </Button>
                                                </Block>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                    :
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
                }
            </Paper>
        </Box>
    );
};


