import { Box } from '@mui/material';
import { SomeEntityTable } from '@entities/some-entity';

export const MainPage = () => {
  return (
    <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <SomeEntityTable />
    </Box>
  );
};
