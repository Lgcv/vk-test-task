import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getTableData } from '../model';

export const SomeEntityTable = () => {
  const tableData = getTableData(15);

  return (
    <TableContainer sx={{ maxHeight: '100%', overflow: 'auto' }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="left">№</TableCell>
            {tableData.columns.map((name, i) => {
              return (
                <TableCell key={i} sx={{ whiteSpace: 'nowrap' }} align="left">
                  {name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.rows.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{i + 1}</TableCell>
              {Object.keys(row).map((field, i) => {
                return <TableCell key={i}>{row[field]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
