import { FC, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App';
import Brightness2SharpIcon from '@mui/icons-material/Brightness2Sharp';
import BrightnessMediumSharpIcon from '@mui/icons-material/BrightnessMediumSharp';
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import Link from '@mui/material/Link';
import { Sidebar } from './Sidebar';

export const Header: FC = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Sidebar />                    
                    <TimelineSharpIcon sx={{mr: '15px', ml: '5px'}} fontSize='large' />
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        <Link href='/' variant="h6" color="grey.50" underline="none">Трекер работы</Link>
                    </Typography>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <BrightnessMediumSharpIcon /> : <Brightness2SharpIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
