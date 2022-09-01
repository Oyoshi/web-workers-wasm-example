import { FC, ChangeEventHandler, MouseEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface FormProps {
  onSubmit: (type: "standard" | "worker", val?: string) => void;
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValue(e.target.value);

  const handleOnSubmitStandard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit("standard", inputValue);
  };

  const handleOnSubmitWorker: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit("worker", inputValue);
  };

  return (
    <form>
      <TextField
        label="number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ width: "100%" }}
        onChange={handleInputChange}
      />
      <Box sx={{ mt: 3 }}>
        <ButtonGroup>
          <Button variant="contained" onClick={handleOnSubmitStandard}>
            Standard Computation
          </Button>
          <Button variant="contained" onClick={handleOnSubmitWorker}>
            Worker Computation
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
};

export default Form;
