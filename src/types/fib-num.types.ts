export type ComputationType = "standard" | "worker";

export type ComputedFibNum = {
  id: number;
  type: ComputationType;
  time: number;
  nth: number;
  fibNum: number;
};
