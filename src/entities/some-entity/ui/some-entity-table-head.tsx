import { TableCell } from '@shared/ui/table-cell';
import { observer } from 'mobx-react-lite';
import { model } from '../model';

export const SomeEntityTableHead = observer(() => {
  const columns = model.columns;

  return (
    <>
      <TableCell align="left">№</TableCell>
      {Object.keys(columns).map((field) => {
        return (
          <TableCell
            key={field}
            sx={{ whiteSpace: 'nowrap' }}
            align="left"
            data-testid="table-column"
          >
            {`${columns[field]}`}
          </TableCell>
        );
      })}
    </>
  );
});
