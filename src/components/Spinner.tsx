import { FC } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner: FC = () => {
  return (
    <Box sx={{ w: 1, mt: 20, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} direction="row">
        <CircularProgress color="primary" />
      </Stack>
    </Box>
  );
};