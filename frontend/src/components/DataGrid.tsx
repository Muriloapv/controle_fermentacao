import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowsProp, GridRowParams, } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface AppDataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  getRowId?: (row: any) => any;

  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export default function AppDataGrid({ rows, columns, loading = false, getRowId, onEdit, onDelete, }: AppDataGridProps) {

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "",
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",

    renderCell: (params: GridRowParams) => (
      <>
        <Tooltip title="Editar">
          <IconButton size="small" onClick={() => onEdit?.(params.row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Excluir">
          <IconButton size="small" color="error" onClick={() => onDelete?.(params.row)} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  };

  return (
    <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        loading={loading}
        getRowId={getRowId}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        density="standard"
        sx={{ 
          background: "#fff",
          border: "none",
          fontSize: 16,
          "& .MuiDataGrid-columnHeaderRow": { background: "#063B52" },
          "& .MuiDataGrid-columnHeader": { background: "#063B52" },
          "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700, color: "#E8E8E8" },
          "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": { color: "#E8E8E8" },
          "& .MuiDataGrid-sortIcon": { color: "#E8E8E8" },
          "& .MuiDataGrid-menuIcon .MuiIconButton-root": { color: "#E8E8E8" },
          "& .MuiDataGrid-row": { borderBottom: "1px solid #f3f4f6" },
          "& .MuiDataGrid-cell": { color: "#222" },
          "& .MuiDataGrid-footerContainer": { background: "#fff",},
      }}
    />
  );
}