import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { model } from '../model';
import { observer } from 'mobx-react-lite';

export const SomeEntityTable = observer(() => {
  const data = model.data;

  return (
    <>
      {data.length > 0 ? (
        <TableContainer sx={{ maxHeight: '100%', overflow: 'auto' }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">№</TableCell>
                {[...Array(Object.keys(data[0]).length)].map((_, i) => {
                  return (
                    <TableCell key={i} sx={{ whiteSpace: 'nowrap' }} align="left">
                      {`Поле ${i + 1}`}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
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
      ) : (
        <>Данных нет</>
      )}
    </>
  );
});
