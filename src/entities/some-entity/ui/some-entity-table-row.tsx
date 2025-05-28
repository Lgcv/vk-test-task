import { TableCell } from '@mui/material';
import type { EntityDto } from '@shared/api/entity';
import { observer } from 'mobx-react-lite';

interface Props {
  row: EntityDto;
}

export const SomeEntityTableRow = observer(({ row }: Props) => {
  return (
    <>
      {Object.keys(row).map((field, i) => {
        return <TableCell key={i}>{row[field]}</TableCell>;
      })}
    </>
  );
});
