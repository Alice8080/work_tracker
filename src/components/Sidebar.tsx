import { FC, useState, KeyboardEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';

export const Sidebar: FC = () => {
  const [state, setState] = useState(false);
  const toggleDrawer =
    (open: boolean) =>
      (event: KeyboardEvent | MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as KeyboardEvent).key === 'Tab' ||
            (event as KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState(open);
      };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, color: 'secondary.contrastText' }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <Divider />
          <List>
            {[
              { 'text': 'Бот', 'href': 'https://t.me/Treker_Raboty_Bot', 'icon': <TimerSharpIcon /> },
              { 'text': 'Github разработчика бота', 'href': 'https://github.com/pe5ha', 'icon': <GitHubIcon /> },
              { 'text': 'Github этого приложения', 'href': 'https://github.com/Alice8080/work_tracker', 'icon': <GitHubIcon /> },
            ].map((item, index) => {
              return (
                <Link key={index} href={item.href} target="_blank" color="text.primary" underline="none">
                  <ListItem >
                    <ListItemButton sx={{
                      borderRadius: 3,
                    }}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}