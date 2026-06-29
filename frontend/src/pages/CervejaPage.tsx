import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";
import CervejaCadastroModal from "../components/CervejaCadastroModal";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Cerveja } from "../models/Cerveja";

const columns: GridColDef[] = [
  {
    field: "cervejaId",
    headerName: "ID",
    width: 100
  },
  {
    field: "cervejaEstiloId",
    headerName: "Estilo ID",
    width: 100
  },
  {
    field: "cervejaNome",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "cervejaObservacao",
    headerName: "Observação",
    flex: 1
  }

];

export default function CervejaPage() {
  const [rows, setRows] = useState<Cerveja[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [cervejaSelecionada, setCervejaSelecionada] = useState<Cerveja | null>(null);

  useEffect(() => {
    carregarCervejas();
  }, []);

  // Busca todas as cervejas da API e atualiza a tabela.
  async function carregarCervejas() {
    try {
      setLoading(true);

      const response = await axios.get<Cerveja[]>(
         "http://localhost:5298/api/Cervejas"
        );

      setRows(response.data);
    } catch (error) {
      console.error("Erro ao carregar cervejas:", error);
    } finally {
      setLoading(false);
    }
  }

  // Define a cerveja selecionada e abre o modal em modo de edição.
  function editar(row: Cerveja) {
    setCervejaSelecionada(row);
    setOpenModal( true );
  }

  // Solicita confirmação e envia soft-delete para a API.
  async function excluir(row: Cerveja) {
    if (confirm(`Deseja excluir ${row.cervejaNome}?`)) {
      try {
        await axios.delete<Cerveja[]>( "http://localhost:5298/api/Cervejas/" + row.cervejaId )

        carregarCervejas();
      } catch( error ){
        console.error("Erro ao excluir cerveja", error );
      }
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}> 
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Cervejas
        </Typography>
              
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => { setCervejaSelecionada( null );
                                   setOpenModal( true );
          }} variant="contained" sx={{ backgroundColor: "#FFC524", "&:hover": { backgroundColor: "#e6b020" }, color: "#000" }}>
            Adicionar cerveja
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <AppDataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          getRowId={(row) => row.cervejaId }
          onEdit={editar}
          onDelete={excluir}
        />
        
        <CervejaCadastroModal
          open={openModal}
          cerveja={cervejaSelecionada}
          onClose={() => {
            setCervejaSelecionada(null);
            setOpenModal(false);
          }}
          onSuccess={carregarCervejas}
        />
      </Box>
    </>
  );
}
