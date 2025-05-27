import { Box } from '@mui/material';
import { SomeEntityTable } from '@entities/some-entity';
import { AddSomeEntity } from '@features/add-some-entity';

export const MainPage = () => {
  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& > *:not(:last-child)': { mb: 2 },
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <SomeEntityTable />
      </Box>
      <Box>
        <AddSomeEntity />
      </Box>
    </Box>
  );
};
