import type { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "cerveja_id",
    headerName: "ID",
    width: 50
  },
  {
    field: "cerveja_nome",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "cervejaEstilo_id",
    headerName: "Estilo ID",
    flex: 1
  },
  {
    field: "cerveja_observacao",
    headerName: "Observação",
    flex: 1
  }
  
];

const rows = [ ];//montar request para rota da api

export default function CervejaPage() {

  function editar(row: any) {
    console.log("Editar:", row);
  }

  function excluir(row: any) {

    if (confirm(`Deseja excluir ${row.nome}?`)) {
      console.log("Excluir:", row);
    }
  }

  return (
    <AppDataGrid
      columns={columns}
      rows={rows}
      onEdit={editar}
      onDelete={excluir}
    />
  );
}