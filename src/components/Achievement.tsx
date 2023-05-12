import { FC, ReactNode } from "react";
import Typography from '@mui/material/Typography';
import { Divider } from "@mui/material";
import { SvgIcon } from '@mui/material';
import { Block } from "./Block";

interface AchievementProps {
    title: string;
    subtitle: string;
    item: string | ReactNode;
    Icon: typeof SvgIcon;
}

export const Achievement: FC<AchievementProps> = ({ title, subtitle, item, Icon }: AchievementProps) => {
    return (
        <Block sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography color='text.secondary' sx={{ pb: typeof item === 'string' ? 0.5 : 2 }}>
                {title}:
            </Typography>
            <Typography color='text.secondary' sx={{ pb: 1 }}>
                {subtitle}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2, width: '80%' }} />
            {typeof item === 'string' ?
            <Typography color='text.secondary' sx={{ pb: 2 }}>
                {item}
            </Typography>
            : <>{item}</>}
            <Icon color='primary' fontSize='large' />
        </Block>
    )
}