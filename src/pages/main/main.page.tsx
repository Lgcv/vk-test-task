import { useEffect } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { someEntityModel, SomeEntityTable } from '@entities/some-entity';
import { AddSomeEntity } from '@features/add-some-entity';
import { Loader } from '@shared/ui/loader';

export const MainPage = observer(() => {
  const isLoading = someEntityModel.isLoading;

  useEffect(() => {
    const request = flowResult(someEntityModel.getData());

    return () => {
      request.cancel();
    };
  }, []);

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
      {isLoading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto' }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <SomeEntityTable />
          </Box>
          <Box>
            <AddSomeEntity />
          </Box>
        </>
      )}
    </Box>
  );
});
