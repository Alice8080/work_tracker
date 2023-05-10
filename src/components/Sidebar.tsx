import { FC, useState, KeyboardEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
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

  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        {[
          { 'text': 'Бот', 'href': '#', 'icon': <TimerSharpIcon /> },
          { 'text': 'Чат проекта', 'href': '#', 'icon': <TelegramIcon /> },
          { 'text': 'Github', 'href': '#', 'icon': <GitHubIcon /> },
        ].map((item, index) => {
          return (
            <ListItem key={index} >
              <ListItemButton sx={{
                borderRadius: 3,
              }}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Link href={item.href} target="_blank" color="text.primary" underline="none">
                  {item.text}
                </Link>} />
              </ListItemButton>
            </ListItem>)
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <div>
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: 'secondary.contrastText' }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </div>
    </div>
  );
}