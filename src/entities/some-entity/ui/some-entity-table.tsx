import { observer } from 'mobx-react-lite';
import { Box, TableCell, TableRow } from '@mui/material';
import { Table } from '@shared/ui/table';
import { model } from '../model';
import { SomeEntityTableHead } from './some-entity-table-head';
import { SomeEntityTableRow } from './some-entity-table-row';
import { useScrollLoad } from '../hooks';
import { Loader } from '@shared/ui/loader';

export const SomeEntityTable = observer(() => {
  const data = model.data;
  const isAdditionalLoading = model.isAdditionalLoading;

  const { tableRef, onScrollHandler } = useScrollLoad();

  return (
    <Table
      onScroll={onScrollHandler}
      ref={tableRef}
      data-testid="table"
      head={<SomeEntityTableHead />}
      rows={
        <>
          {data.map((row, i) => {
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                data-testid="table-row"
              >
                <TableCell>{i + 1}</TableCell>
                <SomeEntityTableRow row={row} />
              </TableRow>
            );
          })}
        </>
      }
      footer={
        <>
          {isAdditionalLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <Loader />
            </Box>
          )}
        </>
      }
    />
  );
});
