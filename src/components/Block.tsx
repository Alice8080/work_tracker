import { FC, ReactNode } from "react";
import Paper from '@mui/material/Paper';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
    sx?: SxProps<Theme>
}

export const Block: FC<ClickableProps> = (props: ClickableProps) => {
    const { children, sx } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Paper sx={{
            backgroundColor: 'secondary.main',
            width: 1,
            height: 'fit-content',
            borderRadius: matches ? 2 : 3,
            p: 3,
            ...sx
            }} 
            variant={theme.palette.mode === 'light' ? "outlined" : 'elevation'}>
            {children}
        </Paper>
    )
}