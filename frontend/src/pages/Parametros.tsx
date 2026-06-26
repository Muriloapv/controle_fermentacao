import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaParametros } from "../models/CervejaParametros";

const columns: GridColDef[] = [
  {
    field: "parametro_id",
    headerName: "ID",
    width: 50
  },
  {
    field: "cerveja_id",
    headerName: "Cerveja ID",
    flex: 1
  },
  {
    field: "parametro_temperatura_min",
    headerName: "Temperatura mínima",
    flex: 1
  },
  {
    field: "parametro_temperatura_max",
    headerName: "Temperatura máxima",
    flex: 1
  },
  {
    field: "parametro_ph_min",
    headerName: "Ph mínimo",
    flex: 1
  },
  {
    field: "parametro_ph_max",
    headerName: "Ph maximo",
    flex: 1
  },
  {
    field: "parametro_extrato_min",
    headerName: "Extrato minimo",
    flex: 1
  },
  {
    field: "parametro_extrato_max",
    headerName: "Extrato maximo",
    flex: 1
  },
  {
    field: "parametro_observacao",
    headerName: "Observação",
    flex: 1
  }

];

export default function ParametrosPage() {
  const [rows, setRows] = useState<CervejaParametros[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarParametros();
  }, []);

  async function carregarParametros() {
    try {
      setLoading(true);
      
      const response = await axios.get<CervejaParametros[]>(
         "http://localhost:5298/api/cervejaParametro" 
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar Parâmetros de Cervejas:", error);
    } finally {
      setLoading(false);
    }
  }

  function editar(row: any) {
    console.log("Editar:", row);
  }

  function excluir(row: any) {

    if (confirm(`Deseja excluir ${row.nome}?`)) {
      console.log("Excluir:", row);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Parâmetros de Cervejas
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}>
            Adicionar parâmetros
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>
    </>
  );}