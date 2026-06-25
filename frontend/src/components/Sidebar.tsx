import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ScienceIcon from "@mui/icons-material/Science";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CategoryIcon from "@mui/icons-material/Category";
import StorageIcon from "@mui/icons-material/Storage";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const itensMenu = [
    {
      titulo: "Dashboard",
      rota: "/",
      icone: <DashboardIcon />
    },
    {
      titulo: "Lotes",
      rota: "/lotes",
      icone: <ScienceIcon />
    },
    {
      titulo: "Cervejas",
      rota: "/cervejas",
      icone: <LocalBarIcon />
    },
    {
      titulo: "Estilos",
      rota: "/estilos",
      icone: <CategoryIcon />
    },
    {
      titulo: "Tanques",
      rota: "/tanques",
      icone: <StorageIcon />
    }
  ];

  return (

    <Drawer
      variant="permanent" 
      sx={{
        width: drawerWidth,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#063B52",
          color: "#E8E8E8",
          borderRight: "none"
        }
      }}
    >

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 3 }}>

        <img
          src="/VectorArBrain.svg"
          alt="Logo Arbrain"
          width={60}
          height={60}
        />

        <Box>

          <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
            ARBRAIN
          </Typography>

          <Typography sx={{ fontSize: "0.75rem", letterSpacing: 1 }}>
            FERMENTAÇÃO
          </Typography>

        </Box>

      </Box>

      <List>

        {itensMenu.map((item) => (

          <ListItemButton
            key={item.rota}
            onClick={() => navigate(item.rota)}
            selected={location.pathname === item.rota}
            sx={{
              mx: 1,
              borderRadius: 2,

              "&:hover": {
                backgroundColor: "#0A4D6D"
              },

              "&.Mui-selected": {
                backgroundColor: "#0A4D6D"
              },

              "&.Mui-selected:hover": {
                backgroundColor: "#0A4D6D"
              }
            }}
          >

            <ListItemIcon sx={{ color: "#E8E8E8" }}>
              {item.icone}
            </ListItemIcon>

            <ListItemText
              primary={item.titulo}
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />

          </ListItemButton>

        ))}

      </List>

    </Drawer>
  );
}