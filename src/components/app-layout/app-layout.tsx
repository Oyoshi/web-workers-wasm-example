import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      m: "3em auto",
      maxWidth: "1024px",
    }}
  >
    {children}
  </Box>
);

export default AppLayout;
