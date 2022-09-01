import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

type ComputedFibNum = {
  id: string;
  type: "standard" | "worker";
  time: number;
  nth: number;
  fibNum: number;
};

interface ResultsTableProps {
  data: ComputedFibNum[];
}

const ResultsTable: FC<ResultsTableProps> = ({ data }) =>
  data.length > 0 ? (
    <TableContainer component={Paper} sx={{ mt: 6 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Computation Type</TableCell>
            <TableCell align="right">N-th</TableCell>
            <TableCell align="right">Fibonacci Number</TableCell>
            <TableCell align="right">Time&nbsp;[ms]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Chip label={row.type} color="secondary" />
              </TableCell>
              <TableCell align="right">{row.nth}</TableCell>
              <TableCell align="right">{row.fibNum}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;

export default ResultsTable;
