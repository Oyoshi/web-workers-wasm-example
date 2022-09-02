import { useReducer } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "components/topbar";
import AppLayout from "components/app-layout";
import Form from "components/form";
import ResultsTable from "components/results-table";
import { ComputationType } from "types";
import { reducer } from "reducers";
import { fib } from "utils";

function App() {
  const [data, dispatch] = useReducer(reducer, {
    error: "",
    computedFibNums: [],
  });

  const runWorkerComputation = (type: ComputationType, nth: number) => {
    dispatch({ type: "SET_ERROR", error: "" });

    const id = data.computedFibNums.length;
    const worker = new window.Worker("./fib-worker.js");
    worker.postMessage({ nth });
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      const { time, fibNum } = e.data;
      dispatch({
        type: "SET_FIB",
        computedFib: {
          id,
          type,
          time,
          nth,
          fibNum,
        },
      });
      worker.terminate();
    };
  };

  const runStandardComputation = (type: ComputationType, nth: number) => {
    dispatch({ type: "SET_ERROR", error: "" });
    const id = data.computedFibNums.length;
    const startTime = new Date().getTime();
    const fibNum = fib(nth);
    const time = new Date().getTime() - startTime;
    dispatch({
      type: "SET_FIB",
      computedFib: {
        id,
        type,
        time,
        nth,
        fibNum,
      },
    });
  };

  const handleOnSubmit = (type: ComputationType, val?: string) => {
    const nth = Number(val);
    if (isNaN(nth) || nth < 0) {
      dispatch({
        type: "SET_ERROR",
        error: "Number must be non negative integer",
      });
      return;
    }
    if (type === "standard") {
      runStandardComputation(type, nth);
    } else {
      runWorkerComputation(type, nth);
    }
  };

  return (
    <>
      <CssBaseline />
      <TopBar />
      <AppLayout>
        <Form onSubmit={handleOnSubmit} />
        {data.error && <h2>{data.error}</h2>}
        <ResultsTable data={data.computedFibNums} />
      </AppLayout>
    </>
  );
}

export default App;
