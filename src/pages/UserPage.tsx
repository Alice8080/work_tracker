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

import { useLazyGetUserInfoQuery } from "../api/apiSlice";
import { ProgressBar } from "../components/ProgressBar";
import { Error } from "../components/Error";
import { Record, RecordsList } from "../api/apiSlice";

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

    useEffect(() => {
        if (userId) {
            getUserInfo(userId);
            if (isSuccess) {
                setUID(userId);
            }
        }
    }, [userId]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
            }}>
            <Paper elevation={3} sx={{
                borderRadius: 3,
                width: 1
            }}>
                <Typography variant="h4" component="h1" sx={{ p: 3 }}>
                    Статистика активности
                    <BarChartRoundedIcon fontSize='large' sx={{ ml: 2, mb: -1 }} />
                </Typography>
            </Paper>

            <Paper elevation={1} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                width: 1,
                borderRadius: 3,
                mt: 6,
                padding: '20px',
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
                                    <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ChartContainer elevation={2}>
                                        график
                                    </ChartContainer>
                                </Grid>

                                <Grid item xs={4}>
                                    <ChartContainer elevation={2}>
                                        график
                                    </ChartContainer>
                                </Grid>
                                <Grid item xs={8}>
                                    <ChartContainer elevation={2}>
                                        график
                                    </ChartContainer>
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


