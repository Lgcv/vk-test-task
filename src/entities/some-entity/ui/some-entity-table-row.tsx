import { TableCell } from '@mui/material';
import type { EntityDto } from '@shared/api/entity';
import { observer } from 'mobx-react-lite';
import { model } from '../model';

interface Props {
  row: EntityDto;
}

export const SomeEntityTableRow = observer(({ row }: Props) => {
  const columns = model.columns;

  return (
    <>
      {Object.keys(columns).map((field) => {
        return <TableCell key={field}>{row[field]}</TableCell>;
      })}
    </>
  );
});
