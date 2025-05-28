import {
  Paper,
  Table as MaterialTable,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import type { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<typeof TableContainer> {
  head: ReactNode;
  rows: ReactNode;
  footer?: ReactNode;
}

export const Table = ({ head, rows, footer, ...rest }: Props) => {
  return (
    <TableContainer sx={{ maxHeight: '100%', overflow: 'auto' }} component={Paper} {...rest}>
      <MaterialTable stickyHeader>
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </MaterialTable>
      {footer}
    </TableContainer>
  );
};
