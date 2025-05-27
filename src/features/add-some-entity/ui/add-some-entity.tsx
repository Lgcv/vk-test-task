import { someEntityModel, type Item } from '@entities/some-entity';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface Inputs {
  [key: string]: string;
}

export const AddSomeEntity = () => {
  const countField = 15;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ mode: 'onTouched' });

  const onAddSomeEntity = (data: Inputs) => {
    const item = Object.keys(data).reduce((res: Item, key) => ({ ...res, [key]: +data[key] }), {});
    someEntityModel.addItem(item);
    reset();
  };

  return (
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
                />
              </Box>
            );
          })}
        </Box>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Добавить
        </Button>
      </form>
    </Paper>
  );
};
