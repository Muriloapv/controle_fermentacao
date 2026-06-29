import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import FermentacaoHistoricoCadastroModal from "../components/FermentacaoHistoricoCadastroModal";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { FermentacaoHistorico } from "../models/FermentacaoHistorico";

const columns: GridColDef[] = [
  {
    field: "historicoId",
    headerName: "ID",
    width: 100
  },
  {
    field: "loteId",
    headerName: "Lote ID",
    width: 100
  },
  {
    field: "historicoPh",
    headerName: "pH",
    flex: 1
  },
  {
    field: "historicoTemperatura",
    headerName: "Temperatura",
    flex: 1
  },
  {
    field: "historicoExtrato",
    headerName: "Extrato",
    flex: 1
  },
  {
    field: "historicoResponsavel",
    headerName: "Responsável",
    flex: 1
  },
  {
    field: "historicoObservacao",
    headerName: "Observação",
    flex: 1
  }

];

export default function HistoricoPage() {
  const [rows, setRows] = useState<FermentacaoHistorico[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    carregarHistorico();
  }, []);

  // Busca todo o histórico de fermentação da API e atualiza a tabela.
  async function carregarHistorico() {
    try {
      setLoading(true);

      const response = await axios.get<FermentacaoHistorico[]>(
         "http://localhost:5298/api/FermentacaoHistorico"
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar histórico de fermentação:", error);
    } finally {
      setLoading(false);
    }
  }

  // Histórico é imutável por regra de negócio: bloqueia a edição com alerta.
  function editar(row: FermentacaoHistorico) {
    alert("Não é possível editar histórico, crie um novo histórico a nova informação")
  }

  // Histórico não pode ser deletado: informa o usuário via alerta.
  function excluir(row: FermentacaoHistorico) {
    alert("Não é possível excluir histórico, crie um novo histórico a nova informação")
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Histórico de fermentação
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => setOpenModal(true)} variant="contained" sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}>
            Adicionar registro de fermentação
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          getRowId={(row) => row.historicoId}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>

      <FermentacaoHistoricoCadastroModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={carregarHistorico}
      />
    </>
  );
}
