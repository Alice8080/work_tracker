import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.grey['900'],
    borderRadius: theme.shape.borderRadius,
}));

export function Footer() {
    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                <StyledFab href='https://t.me/Treker_Raboty_Bot' color="primary" aria-label="add" title='Добавить дело'>
                    <AddIcon />
                </StyledFab>
                <StyledBottomNavigation />
            </Paper>
        </Box>
    );
}
