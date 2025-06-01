import { useEffect, useRef } from 'react';
import { flowResult } from 'mobx';
import { useForm } from 'react-hook-form';
import type { CancellablePromise } from 'mobx/dist/internal';
import { Box, Button, Paper } from '@mui/material';
import { TextField } from '@shared/ui/text-field';
import { someEntityModel } from '@entities/some-entity';
import type { CreateEntityDto } from '@shared/api/entity';
import { model } from '../model';
import { validators } from '@shared/lib/validators';

type Inputs = CreateEntityDto;

export const AddSomeEntity = () => {
  const columns = someEntityModel.columns;
  const isLoading = model.isLoading;

  const requestRef = useRef<CancellablePromise<unknown> | null>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ mode: 'onTouched' });

  const onAddSomeEntity = async (data: Inputs) => {
    requestRef.current = flowResult(model.createItem(data));

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
      {Object.keys(columns).length > 0 ? (
        <Paper sx={{ p: 2 }} elevation={4}>
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
              {Object.keys(columns).map((field) => {
                return (
                  <Box key={field} sx={{ px: 1, pt: 2 }}>
                    <TextField
                      data-testid={'input'}
                      label={`${columns[field]}`}
                      {...register(
                        field,
                        validators[field as keyof typeof validators] || {
                          required: 'Поле обязательно для заполнения',
                        },
                      )}
                      helperText={errors[field]?.message}
                      {...(errors[field]?.message ? { error: true } : { error: false })}
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
