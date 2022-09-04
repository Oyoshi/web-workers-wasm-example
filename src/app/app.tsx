import { useReducer } from "react";
import init, { fib_wasm } from "fib-wasm-lib";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "components/appbar";
import AppLayout from "components/app-layout";
import Form from "components/form";
import ResultsTable from "components/results-table";
import Snackbar, { OnCloseFunction } from "components/snackbar";
import { reducer, ComputationType, ComputationLng } from "reducers";
import { fib } from "utils";

function App() {
  const [res, dispatch] = useReducer(reducer, {
    error: "",
    computedFibNums: [],
  });

  const handleOnCloseAlert: OnCloseFunction = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "SET_ERROR", error: "" });
  };

  const runWorkerComputation = (
    type: ComputationType,
    lng: ComputationLng,
    nth: number
  ) => {
    dispatch({ type: "SET_ERROR", error: "" });

    const id = res.computedFibNums.length;
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
          lng,
          time,
          nth,
          fibNum,
        },
      });
      worker.terminate();
    };
  };

  const runStandardComputation = (
    type: ComputationType,
    lng: ComputationLng,
    nth: number
  ) => {
    dispatch({ type: "SET_ERROR", error: "" });
    const id = res.computedFibNums.length;
    let fibNum = -1;
    const startTime = new Date().getTime();
    if (lng == "javascript") {
      fibNum = fib(nth);
      const time = new Date().getTime() - startTime;
      dispatch({
        type: "SET_FIB",
        computedFib: {
          id,
          type,
          lng,
          time,
          nth,
          fibNum,
        },
      });
    } else {
      init().then(() => {
        fibNum = fib_wasm(nth);
        const time = new Date().getTime() - startTime;
        dispatch({
          type: "SET_FIB",
          computedFib: {
            id,
            type,
            lng,
            time,
            nth,
            fibNum,
          },
        });
      });
    }
  };

  const handleOnSubmit = (
    type: ComputationType,
    lng: ComputationLng,
    val?: string
  ) => {
    const nth = Number(val);
    if (isNaN(nth) || nth < 0) {
      dispatch({
        type: "SET_ERROR",
        error: "Number must be a non negative integer!",
      });
      return;
    }
    if (type === "standard") {
      runStandardComputation(type, lng, Math.floor(nth));
    } else {
      runWorkerComputation(type, lng, Math.floor(nth));
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar />
      <AppLayout>
        <Snackbar
          open={!!res.error}
          message={res.error}
          severity="error"
          onClose={handleOnCloseAlert}
        />
        <Form onSubmit={handleOnSubmit} />
        <ResultsTable data={res.computedFibNums} />
      </AppLayout>
    </>
  );
}

export default App;
