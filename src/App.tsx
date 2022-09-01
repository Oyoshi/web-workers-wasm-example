import { useReducer } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "components/topbar";
import AppLayout from "components/app-layout";
import Form from "components/form";
import ResultsTable from "components/results-table";

type State = {
  computedFibNums: ComputedFibNum[];
  error?: string;
};

type ComputedFibNum = {
  id: string;
  type: "standard" | "worker";
  time: number;
  nth: number;
  fibNum: number;
};

type Action =
  | { type: "SET_ERROR"; error: string }
  | { type: "SET_FIBO"; computedFib: ComputedFibNum };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_FIBO":
      return {
        ...state,
        computedFibNums: [...state.computedFibNums, { ...action.computedFib }],
      };
    /*case "UPDATE_FIBO": {
      const curr = (state as any).computedFibs.filter(
        (c: any) => c.id === action.id
      )[0];
      const idx = (state as any).computedFibs.indexOf(curr);

      curr.loading = false;
      curr.time = action.time;
      curr.fibNum = action.fibNum;

      (state as any).computedFibs[idx] = curr;
      return { ...state };
    }*/
    default:
      return state;
  }
};

const fib = (n: number): number => (n < 2 ? n : fib(n - 2) + fib(n - 1));

function App() {
  const [info, dispatch] = useReducer(reducer, {
    error: "",
    computedFibNums: [],
  });

  /*const runWorker = (num: any, id: any) => {
    dispatch({ type: "SET_ERROR", error: "" });
    const worker = new window.Worker("./fib-worker.js");

    worker.postMessage({ num });
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      const { time, fibNum } = e.data;
      dispatch({
        type: "UPDATE_FIBO",
        id,
        time,
        fibNum,
      });
      worker.terminate();
    };
  };*/

  const handleOnSubmit = (type: "standard" | "worker", val?: string) => {
    const nth = Number(val);
    if (isNaN(nth) || nth < 0) {
      dispatch({
        type: "SET_ERROR",
        error: "Number must be non negative integer",
      });
      return;
    }
    const id = info.computedFibNums.length;
    const startTime = new Date().getTime();
    const fibNum = fib(nth);
    const time = new Date().getTime() - startTime;
    dispatch({
      type: "SET_FIBO",
      computedFib: {
        id: id.toString(),
        type,
        time,
        nth,
        fibNum,
      },
    });
    // runWorker(val, id);
  };

  return (
    <>
      <CssBaseline />
      <TopBar />
      <AppLayout>
        <Form onSubmit={handleOnSubmit} />
        <ResultsTable data={info.computedFibNums} />
      </AppLayout>
    </>
  );
}

export default App;
