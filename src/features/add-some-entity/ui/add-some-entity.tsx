import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { someEntityModel } from '@entities/some-entity';
import type { CreateEntityDto } from '@shared/api/entity';
import { model } from '../model';
import { flowResult } from 'mobx';
import { useEffect, useRef } from 'react';
import type { CancellablePromise } from 'mobx/dist/internal';

interface Inputs {
  [key: string]: string;
}

export const AddSomeEntity = () => {
  const countField = Object.keys(someEntityModel.data[0] || {}).length;
  const isLoading = model.isLoading;

  const requestRef = useRef<CancellablePromise<unknown> | null>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ mode: 'onTouched' });

  const onAddSomeEntity = async (data: Inputs) => {
    const item = Object.keys(data).reduce(
      (res: CreateEntityDto, key) => ({ ...res, [key]: +data[key] }),
      {},
    );

    requestRef.current = flowResult(model.createItem(item));

    requestRef.current.finally(() => {
      reset();
    });
  };

  useEffect(() => {
    return () => {
      requestRef.current?.cancel();
    };
  }, []);

  return (
    <>
      {countField > 0 ? (
        <Paper sx={{ p: 2 }} elevation={2}>
          <form onSubmit={handleSubmit(onAddSomeEntity)}>
            <Box
              sx={{
                mb: 2,
                mt: -2,
                mx: -1,
                display: 'flex',
                flexWrap: 'wrap',
                '& > *': {
                  flex: '0 0 20%',
                },
              }}
            >
              {[...Array(countField)].map((_, i) => {
                return (
                  <Box key={i} sx={{ px: 1, pt: 2 }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      label={`Поле ${i + 1}`}
                      {...register(`field${i}`, { required: 'Поле обязательно для заполнения' })}
                      helperText={errors[`field${i}`]?.message}
                      {...(errors[`field${i}`]?.message ? { error: true } : { error: false })}
                    />
                  </Box>
                );
              })}
            </Box>
            <Button type="submit" variant="contained" disabled={!isValid} loading={isLoading}>
              Добавить
            </Button>
          </form>
        </Paper>
      ) : null}
    </>
  );
};
