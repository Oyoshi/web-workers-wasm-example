export type ComputationType = "standard" | "worker";

export type ComputationLng = "javascript" | "wasm";

export type ComputedFibNum = {
  id: number;
  type: ComputationType;
  lng: ComputationLng;
  time: number;
  nth: number;
  fibNum: number;
};

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
