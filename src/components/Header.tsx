import * as React from 'react';
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
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

const settings = ['Выйти из профиля'];

export const Header: FC = () => {
    const [user, setUser] = useLocalStorage<any | undefined>('user', '');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        setUser('');
        window.location.reload();
    }

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} position="static" variant={theme.palette.mode === 'light' ? "outlined" : 'elevation'} sx={{ backgroundColor: 'secondary.main' }}>
                <Toolbar>
                    <Sidebar />
                    <TimelineSharpIcon sx={{ mr: '15px', ml: '5px', color: 'secondary.contrastText' }} fontSize='large' />
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        <Link href='https://alice8080.github.io/work_tracker/' variant="h6" color="secondary.contrastText" underline="none">Трекер работы</Link>
                    </Typography>
                    {user ? 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Ваш профиль">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Аватар" src={JSON.parse(JSON.stringify(user)).photo_url} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Button color='inherit' onClick={logout} sx={{ p: 0, '&:hover': { background: 'none'} }}>{setting}</Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    : null}
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <BrightnessMediumSharpIcon sx={{ color: 'secondary.contrastText' }} /> : <Brightness2SharpIcon sx={{ color: 'secondary.contrastText' }} />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
