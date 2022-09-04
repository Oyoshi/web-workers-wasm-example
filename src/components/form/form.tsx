import { FC, ChangeEventHandler, MouseEventHandler, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ComputationType, ComputationLng } from "reducers";

interface FormProps {
  onSubmit: (type: ComputationType, lng: ComputationLng, val?: string) => void;
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValue(e.target.value);

  const handleOnSubmitStandardJS: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    onSubmit("standard", "javascript", inputValue);
  };

  const handleOnSubmitStandardWASM: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    onSubmit("standard", "wasm", inputValue);
  };

  const handleOnSubmitWorkerJS: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit("worker", "javascript", inputValue);
  };

  return (
    <form>
      <Stack spacing={2}>
        <TextField
          id="nthNumberInput"
          label="number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%" }}
          onChange={handleInputChange}
        />
        <Button
          id="submitStdJSButton"
          variant="contained"
          onClick={handleOnSubmitStandardJS}
        >
          Standard JS Computation
        </Button>
        <Button
          id="submitWorkerJSButton"
          variant="contained"
          onClick={handleOnSubmitWorkerJS}
        >
          Worker JS Computation
        </Button>
        <Button
          id="submitStdWASMButton"
          variant="contained"
          onClick={handleOnSubmitStandardWASM}
        >
          Standard WASM Computation
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
