import { ComputedFibNum } from "types";

type State = {
  computedFibNums: ComputedFibNum[];
  error?: string;
};

type Action =
  | { type: "SET_ERROR"; error: string }
  | { type: "SET_FIB"; computedFib: ComputedFibNum };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_FIB":
      return {
        ...state,
        computedFibNums: [...state.computedFibNums, { ...action.computedFib }],
      };
    default:
      return state;
  }
};
