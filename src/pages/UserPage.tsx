import { FC, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useLazyGetUserInfoQuery } from "../api/apiSlice";
import { ProgressBar } from "../components/ProgressBar";
import { Error } from "../components/Error";
import { BarChart } from "../components/BarChart";
import { Block } from "../components/Block";
import { Params } from "../hooks/useRecords";
import { useRecords } from "../hooks/useRecords";
import { NoRecords } from "../components/NoRecords";
import { Achievement } from "../components/Achievement";
import { NoUser } from "../components/NoUser";

export const UserPage: FC = () => {
    const [getUserInfo,
        { data: recordsListN,
            isLoading,
            isFetching,
            isSuccess,
            isError
        }] = useLazyGetUserInfoQuery();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const urlParams = useParams();
    const userId: string | undefined = urlParams.id;
    const [uId, setUID] = useLocalStorage<string | undefined>('uid', undefined);
    const [params, setParams] = useState<Params>({ time: matches ? 'week' : 'all', recordName: '' });
    // console.log(recordsList),
 
    const recordsList = [{fromDate: '2023-05-08T20:24:54.000Z', toDate: '2023-05-08T20:42:31.000Z', name: 'что-нибубудь'}, 
    {fromDate: '2023-04-22T17:51:16.000Z', toDate: '2023-04-22T19:02:25.000Z', name: 'Кубик'}, 
    {fromDate: '2023-04-18T13:53:44.000Z', toDate: '2023-04-18T15:21:56.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-17T19:48:25.000Z', toDate: '2023-04-17T21:24:39.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-17T18:58:53.000Z', toDate: '2023-04-17T19:08:12.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-14T12:15:22.000Z', toDate: '2023-04-14T14:04:56.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-10T22:29:30.000Z', toDate: '2023-04-10T22:52:34.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-10T13:12:18.000Z', toDate: '2023-04-10T14:05:59.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-09T22:43:13.000Z', toDate: '2023-04-09T23:51:17.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-07T18:27:22.000Z', toDate: '2023-04-07T20:33:27.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-05T22:49:25.000Z', toDate: '2023-04-05T23:58:44.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-04T22:10:19.000Z', toDate: '2023-04-04T22:38:15.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-03T13:53:01.000Z', toDate: '2023-04-03T15:56:00.000Z', name: 'диплом'}, 
    {fromDate: '2023-04-03T10:29:36.000Z', toDate: '2023-04-03T13:11:50.000Z', name: 'диплом'}, 
    {fromDate: '2023-02-21T22:17:11.000Z', toDate: '2023-02-21T22:58:58.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-16T22:47:12.000Z', toDate: '2023-02-16T23:28:49.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-15T22:50:56.000Z', toDate: '2023-02-16T00:01:05.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-14T22:25:00.000Z', toDate: '2023-02-14T23:38:57.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-08T23:57:01.000Z', toDate: '2023-02-09T00:37:49.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-07T23:27:31.000Z', toDate: '2023-02-08T00:02:41.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-05T23:12:40.000Z', toDate: '2023-02-06T00:06:50.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-04T23:41:34.000Z', toDate: '2023-02-05T00:18:26.000Z', name: 'Книга по js'}, 
    {fromDate: '2023-02-03T22:52:07.000Z', toDate: '2023-02-03T23:29:34.000Z', name: 'Книга по js'}]
    const { formData, getBestResults } = useRecords(recordsList);

    useEffect(() => {
        if (userId) {
            // getUserInfo(userId);
            if (isSuccess) {
                setUID(userId);
            }
        }
    }, [userId, isSuccess]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setParams((params: Params) => ({ ...params, recordName: event.target.value as string | undefined }))
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setParams((params: Params) => ({ ...params, time: event.target.value as 'all' | 'month' | 'week' }))
    };
    const { labels, data, allHours } = formData(params);
    const { firstDate, lastDate, weekHours, bestDay, bestMonth } = getBestResults();
    const timeItems = [
        ['week', 'Последняя неделя'],
        ['month', 'Последний месяц'],
        ['all', 'Все время'],
    ];

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
                p: matches ? 2 : 2.5
            }}>
                <Typography variant='h5' component="h1">
                    Статистика активности
                    <AutoGraphIcon sx={{ ml: 2, fontSize: '27px', mb: -0.5 }} />
                </Typography>
            </Block>
            <Paper sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                width: 1,
                borderRadius: 3,
                mt: 2,
                padding: matches ? '8px' : '20px',
                border: matches ? 0 : 1,
                borderColor: 'secondary.dark',
                mb: 4
            }}>
                {isLoading || isFetching ?
                    <ProgressBar />
                : isError ?
                    <Error />
                : isSuccess && !recordsList ?
                    <NoRecords />
                // : isSuccess && recordsList && recordsList.length > 0 ?
                : true ?
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2 }} >
                            <Grid item xs={12} lg={9} sx={{ w: 1, h: 1 }}>
                                <Block
                                    sx={{ width: 1, height: 1, padding: matches ? '8px' : '20px', }}>
                                    <BarChart recordsList={recordsList} labels={labels} data={data} name={params.recordName} />
                                </Block>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <Grid container spacing={{ xs: 2 }}>
                                    <Grid item xs={12}>
                                        <Block sx={{ textAlign: 'center' }}>
                                            <FormControl fullWidth >
                                                <InputLabel id="demo-simple-select-label">Выберите период</InputLabel>
                                                <Select
                                                    sx={{ fontSize: '14px', mb: 2 }}
                                                    value={params.time}
                                                    onChange={handleSelectChange}
                                                    label='Выберите период ;;;;'
                                                    inputProps={{ 'aria-label': 'Without label' }}>
                                                    {(matches ? timeItems : timeItems.reverse()).map((item, i) => <MenuItem key={i} value={item[0]}>{item[1]}</MenuItem>)}
                                                </Select>
                                                <TextField
                                                    label="Введите название дела"
                                                    defaultValue=""
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    sx={{ mb: 2 }}
                                                />
                                                <FormHelperText sx={{ mb: 1 }}>По умолчанию на графике отображается общее время всех дел в часах</FormHelperText>
                                                <FormHelperText>Если график пуст, то по выбранному делу или в выбранный период нет записей</FormHelperText>
                                            </FormControl>
                                        </Block>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Achievement 
                                            title='Время работы' 
                                            subtitle={allHours} 
                                            item={<>
                                                <Typography color='text.secondary' sx={{ pb: 1 }}>
                                                    Дата первой записи:
                                                </Typography>
                                                <Typography color='text.secondary' sx={{ pb: 2 }}>
                                                    {firstDate}
                                                </Typography>
                                                </>} 
                                            Icon={AccessTimeRoundedIcon} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Achievement title='Лучший день за все время' subtitle={bestDay.day} item={`Время работы — ${bestDay.hours}`} Icon={EmojiEventsRoundedIcon} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Achievement title='Лучший месяц' subtitle={bestMonth.month} item={`За него вы проработали ${bestMonth.hours}`} Icon={EventAvailableRoundedIcon} />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Achievement title='Общее время работы за последнюю неделю' subtitle={weekHours} item={`Последняя запись сделана ${lastDate}`} Icon={EventAvailableRoundedIcon} />
                            </Grid>
                        </Grid>
                    </Box>
                : <NoUser />}
            </Paper>
        </Box>
    );
};


