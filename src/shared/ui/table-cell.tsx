import { TableCell as MaterialTableCell } from '@mui/material';
import type { ComponentProps, PropsWithChildren } from 'react';

type Props = ComponentProps<typeof MaterialTableCell>;

export const TableCell = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <MaterialTableCell {...props} sx={{ whiteSpace: 'nowrap' }}>
      {children}
    </MaterialTableCell>
  );
};
