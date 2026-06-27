import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

export default function MainLayout() {

  return (

    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }} >
        <Outlet />
      </Box>

    </Box>

  );
} 