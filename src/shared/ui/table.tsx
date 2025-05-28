import {
  Paper,
  Table as MaterialTable,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  head: ReactNode;
  rows: ReactNode;
}

export const Table = ({ head, rows }: Props) => {
  return (
    <TableContainer sx={{ maxHeight: '100%', overflow: 'auto' }} component={Paper}>
      <MaterialTable stickyHeader>
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
