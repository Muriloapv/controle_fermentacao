import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Tanque } from "../models/Tanque";
const columns: GridColDef[] = [
  {
    field: "tanqueId",
    headerName: "ID",
    width: 70
  },
  {
    field: "tanqueDescricao",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "tanqueCapacidade",
    headerName: "Capacidade(LT)",
    flex: 1
  },
  {
    field: "tanqueObservacao",
    headerName: "Observação",
    flex: 1
  }
];

export default function TanquePage() {
  const [rows   , setRows   ] = useState<Tanque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTanques();
  }, []);

  async function carregarTanques() {
    try {
      setLoading(true);
      
      const response = await axios.get<Tanque[]>(
         "http://localhost:5298/api/tanque" 
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar tanques:", error);
    } finally {
      setLoading(false);
    }
  }

  function editar(row: Tanque) {
    console.log("Editar:", row);
  }

  async function excluir(row: Tanque) {

    if (confirm(`Deseja excluir ${row.tanqueDescricao}?`)) {
      try {
        await axios.delete<Tanque[]>(
          "http://localhost:5298/api/tanque/" + row.tanqueId   
        )
        
        carregarTanques();
      } catch(error){
        console.error("", error)
      }
      
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Tanques
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}>
            Adicionar tanque
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          getRowId={(row) => row.tanqueId}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>
    </>
  );
}