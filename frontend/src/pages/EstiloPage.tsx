import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaEstilo } from "../models/CrevejaEstilo";
import CervejaEstiloCadastroModal from "../components/CervejaEstiloCadastroModal";

const columns: GridColDef[] = [
  {
    field: "cervejaEstiloId",
    headerName: "ID",
    width: 100
  },
  {
    field: "cervejaEstiloDescricao",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "cervejaEstiloObservacao",
    headerName: "Observação",
    flex: 1
  }
];

export default function EstiloPage() {
  const [rows, setRows] = useState<CervejaEstilo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [estiloSelecionado, setEstiloSelecionado] = useState<CervejaEstilo | null>(null);

  useEffect(() => {
    carregarEstilos();
  }, []);

  async function carregarEstilos() {
    try {
      setLoading(true);
      
      const response = await axios.get<CervejaEstilo[]>(
         "http://localhost:5298/api/CervejaEstilo" 
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar cervejas:", error);
    } finally {
      setLoading(false);
    }
  }

  function editar(row: CervejaEstilo) {
    setEstiloSelecionado(row);
    setOpenModal(true);
  }

  async function excluir(row: CervejaEstilo) {

    if (confirm(`Deseja excluir ${row.cervejaEstiloDescricao}?`)) {
      try {
        await axios.delete<CervejaEstilo[]>(
          "http://localhost:5298/api/CervejaEstilo/" + row.cervejaEstiloId
        )

        carregarEstilos();
      } catch ( error ){
        console.error("Error ao excluir estilo", error );
      }
      
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Estilo de cerveja
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={() => {
              setEstiloSelecionado(null);
              setOpenModal(true);
            }}
            variant="contained"
            sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}
          >
            Adicionar estilo
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          getRowId={(row) => row.cervejaEstiloId}
          onEdit={editar}
          onDelete={excluir}
        />
      </Box>

      <CervejaEstiloCadastroModal
        open={openModal}
        estilo={estiloSelecionado}
        onClose={() => {
          setOpenModal(false);
          setEstiloSelecionado(null);
        }}
        onSuccess={carregarEstilos}
      />
    </>
  );
}
