import { TextField as MaterialTextField } from '@mui/material';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof MaterialTextField>;

export const TextField = (props: Props) => {
  return <MaterialTextField variant="outlined" size="small" fullWidth {...props} />;
};
