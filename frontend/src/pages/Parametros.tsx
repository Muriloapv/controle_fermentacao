import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaParametros } from "../models/CervejaParametros";

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

  // Busca os parâmetros de todas as cervejas da API e atualiza a tabela.
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

  // Parâmetros são gerenciados pelo cadastro da cerveja: bloqueia edição direta com alerta.
  function editar(row: any) {
    alert("Para editar algum parametro referente a cerveja, por favor acesse o cadastro da cerveja em questão")
  }

  // Parâmetros são gerenciados pelo cadastro da cerveja: bloqueia exclusão direta com alerta.
  async function excluir(row: any) {
    alert("Para excluir algum parametro referente a cerveja, por favor acesse o cadastro da cerveja em questão")
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Parâmetros de Cervejas
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1 rem", lineHeight: 1, color: "red", fontStyle: "italic" }}>
            Para editar acesse diretamente o cadastro da cerveja
          </Typography>          
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