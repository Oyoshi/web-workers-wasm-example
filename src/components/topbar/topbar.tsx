import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const TopBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Compute n-th Fibonacci Number
      </Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
