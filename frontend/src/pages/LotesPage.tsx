import type { Lote } from "../models/Lote";
import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import LoteCadastroModal from "../components/LoteCadastroModal";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "loteId",
    headerName: "ID",
    width: 100
  },
  {
    field: "loteDescricao",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "loteQuantidade",
    headerName: "Quantidade(LT)",
    flex: 1
  },
  {
    field: "loteObservacao",
    headerName: "Observação",
    flex: 1
  },
  {
    field: "tanqueId",
    headerName: "Tanque ID",
    flex: 1
  },
  {
    field: "cervejaId",
    headerName: "Cerveja ID",
    flex: 1
  },
  {
    field: "loteInicio",
    headerName: "Início",
    flex: 1
  },
  {
    field: "loteFinalizacao",
    headerName: "Finalização",
    flex: 1
  }

];
export default function LotesPage() {
  const [rows, setRows] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [loteSelecionado, setLoteSelecionado] = useState<Lote | null>(null);

  useEffect(() => {
    carregarLotes();
  }, []);

  async function carregarLotes() {
    try {
      setLoading(true);
      
      const response = await axios.get<Lote[]>(
         "http://localhost:5298/api/lote" 
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
    } finally {
      setLoading(false);
    }
  }

  function editar(row: Lote) {
    setLoteSelecionado(row);
    setOpenModal(true);
  }

  async function excluir(row: Lote) {
    if (confirm(`Deseja excluir ${row.loteDescricao}?`)) {
      try {
        await axios.delete<Lote[]>(
          "http://localhost:5298/api/lote/" + row.loteId
        )

        carregarLotes();
      } catch(error){
        console.error("Erro ao excluir lote", error)
      }
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Lotes
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={() => {
              setLoteSelecionado(null);
              setOpenModal(true);
            }}
            variant="contained"
            sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}
          >
            Adicionar lote
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          getRowId={(row) => row.loteId}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>

      <LoteCadastroModal
        open={openModal}
        lote={loteSelecionado}
        onClose={() => {
          setLoteSelecionado(null);
          setOpenModal(false);
        }}
        onSuccess={carregarLotes}
      />
    </>
  );  
}
