import { TableCell, TableRow } from '@mui/material';
import { model } from '../model';
import { observer } from 'mobx-react-lite';
import { SomeEntityTableHead } from './some-entity-table-head';
import { SomeEntityTableRow } from './some-entity-table-row';
import { Table } from '@shared/ui/table';

export const SomeEntityTable = observer(() => {
  const data = model.data;

  return (
    <>
      {data.length > 0 ? (
        <Table
          head={<SomeEntityTableHead item={data[0]} />}
          rows={
            <>
              {data.map((row, i) => (
                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{i + 1}</TableCell>
                  <SomeEntityTableRow key={i} row={row} />
                </TableRow>
              ))}
            </>
          }
        />
      ) : (
        <>Данных нет</>
      )}
    </>
  );
});
