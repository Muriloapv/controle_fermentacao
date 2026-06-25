import { createTheme } from "@mui/material";
import { colors } from "./colors";

const theme = createTheme({
   palette: {
      mode: "dark",

      primary: {
         main: colors.sidebar
      },

      background: {
         default: colors.background,
         paper: colors.sidebar
      },

      text: {
         primary: colors.textPrimary,
         secondary: colors.textSecondary
      }
   },
   typography: {
      fontFamily: "'Montserrat', system-ui, sans-serif",
   }
});

export default theme;