import type { GridColDef } from "@material-ui/data-grid";
import AppDataGrid from "../components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "tanque_id",
    headerName: "ID",
    width: 70
  },
  {
    field: "tanque_descricao",
    headerName: "Descrição",
    flex: 1
  },
  {
    field: "tanque_capacidade",
    headerName: "Capacidade(LT)",
    flex: 1
  },
  {
    field: "tanque_observacao",
    headerName: "Observação",
    flex: 1
  }
];

const rows = [];//montar request para rota da api localhost:5298/api/tanques

export default function TanquePage() {
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
        <h1>Tanques</h1>

        <AppDataGrid
          columns={columns}
          rows={rows}
          onEdit={editar}
          onDelete={excluir}
        />
    </>
  );
}