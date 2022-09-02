import { FC, forwardRef, SyntheticEvent } from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const HIDE_DURATION_IN_MS = 6000;

export type OnCloseFunction = (
  event?: SyntheticEvent | Event,
  reason?: string
) => void;

interface SnackbarProps {
  open: boolean;
  message?: string;
  severity: AlertColor;
  onClose: OnCloseFunction;
}

const Snackbar: FC<SnackbarProps> = ({ open, message, severity, onClose }) => {
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={HIDE_DURATION_IN_MS}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
