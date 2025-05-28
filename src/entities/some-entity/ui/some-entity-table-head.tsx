import { TableCell } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { Entity } from '../model';

interface Props {
  item: Entity;
}

export const SomeEntityTableHead = observer(({ item }: Props) => {
  return (
    <>
      <TableCell align="left">№</TableCell>
      {[...Array(Object.keys(item).length)].map((_, i) => {
        return (
          <TableCell key={i} sx={{ whiteSpace: 'nowrap' }} align="left">
            {`Поле ${i + 1}`}
          </TableCell>
        );
      })}
    </>
  );
});
