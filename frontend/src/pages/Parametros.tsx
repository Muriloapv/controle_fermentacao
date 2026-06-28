import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaParametros } from "../models/CervejaParametros";
import type { FermentacaoHistorico } from "../models/FermentacaoHistorico";

const columns: GridColDef[] = [
  {
    field: "cervejaParametroId",
    headerName: "ID",
    width: 50
  },
  {
    field: "cervejaId",
    headerName: "Cerveja ID",
    flex: 1
  },
  {
    field: "cervejaParametroTemperaturaMin",
    headerName: "Temperatura mínima",
    flex: 1
  },
  {
    field: "cervejaParametroTemperaturaMax",
    headerName: "Temperatura máxima",
    flex: 1
  },
  {
    field: "cervejaParametroPhMin",
    headerName: "Ph mínimo",
    flex: 1
  },
  {
    field: "cervejaParametroPhMax",
    headerName: "Ph maximo",
    flex: 1
  },
  {
    field: "cervejaParametroExtratoMin",
    headerName: "Extrato minimo",
    flex: 1
  },
  {
    field: "cervejaParametroExtratoMax",
    headerName: "Extrato maximo",
    flex: 1
  },
  {
    field: "cervejaParametroObservacao",
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

  async function excluir(row: any) {

    if (confirm(`Deseja excluir ${row.nome}?`)) {
      try {
        await axios.delete<CervejaParametros[]>(
          "http://localhost:5298/api/cervejaParametro/" + row.cervejaParametroId
        );

        carregarParametros();       
      } catch(error){
        console.error("Erro ao excluir parâmetros", error)
      }
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
          getRowId={(row) => row.cervejaParametroId}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>
    </>
  );}