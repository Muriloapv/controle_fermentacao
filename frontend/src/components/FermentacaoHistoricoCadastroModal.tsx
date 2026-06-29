import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem,TextField, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Lote } from "../models/Lote";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type HistoricoForm = {
  loteId              : string;
  historicoPh         : string;
  historicoTemperatura: string;
  historicoExtrato    : string;
  historicoResponsavel: string;
  historicoDataColeta : string;
  historicoObservacao : string;
};

const formInicial: HistoricoForm = {
  loteId              : "",
  historicoPh         :   "",
  historicoTemperatura: "",
  historicoExtrato    : "",
  historicoResponsavel: "",
  historicoDataColeta : "",
  historicoObservacao : "",
};

export default function FermentacaoHistoricoCadastroModal({ open, onClose,onSuccess, }: Props) {
  const [form    , setForm    ] = useState<HistoricoForm>(formInicial);
  const [lotes   , setLotes   ] = useState<Lote[]>([]);
  const [errors  , setErrors  ] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!open) return;

    carregarLotes();
    setForm(formInicial);
    setErrors({});
  }, [open]);

  // O registro de fermentação sempre precisa estar vinculado a um lote existente.
  async function carregarLotes() {
    try {
      const response = await axios.get<Lote[]>("http://localhost:5298/api/lote");
      setLotes(response.data);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
    }
  }

  // Atualiza um campo do formulário e limpa o erro associado a ele.
  function alterarCampo(campo: keyof HistoricoForm, valor: string) {
    setForm  ((atual) => ({ ...atual, [campo]: valor, }));
    setErrors((atual) => ({ ...atual, [campo]: ""   , }));
  }

  function limparFormulario() {
    setForm(formInicial);
    setErrors({});
  }

  function fecharModal() {
    limparFormulario();
    onClose();
  }

  // Verifica se um campo numérico do histórico está preenchido e é maior que zero.
  function validarNumero(  campo: keyof HistoricoForm,mensagem: string, novosErros: Record<string, string>) {
    const valor = Number(form[campo]);

    if (!form[campo]) {
      novosErros[campo] = mensagem;
    } else if (Number.isNaN(valor) || valor <= 0) {
      novosErros[campo] = "Informe um valor maior que zero.";
    }
  }

  // Valida pH, temperatura, extrato, responsável e data de coleta antes de salvar.
  function validarFormulario() {
    const novosErros: Record<string, string> = {};

    if (!form.loteId) {
      novosErros.loteId = "Selecione um lote.";
    }

    validarNumero("historicoPh", "Informe o pH.", novosErros);
    validarNumero("historicoTemperatura", "Informe a temperatura.", novosErros);
    validarNumero("historicoExtrato", "Informe o extrato.", novosErros);

    if (!form.historicoResponsavel.trim()) {
      novosErros.historicoResponsavel = "Informe o responsável.";
    } else if (form.historicoResponsavel.length > 200) {
      novosErros.historicoResponsavel =
        "O responsável deve ter no máximo 200 caracteres.";
    }

    if (!form.historicoDataColeta) {
      novosErros.historicoDataColeta = "Informe a data da coleta.";
    }

    if (form.historicoObservacao.length > 2000) {
      novosErros.historicoObservacao =
        "A observação deve ter no máximo 2000 caracteres.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  // Histórico de fermentação é apenas inserido; não há fluxo de edição ou exclusão.
  async function salvar() {
    if (!validarFormulario()) return;

    try {
      setSalvando(true);

      await axios.post("http://localhost:5298/api/FermentacaoHistorico", {
        loteId: Number(form.loteId),
        historicoPh: Number(form.historicoPh),
        historicoTemperatura: Number(form.historicoTemperatura),
        historicoExtrato: Number(form.historicoExtrato),
        historicoResponsavel: form.historicoResponsavel.trim(),
        historicoDataColeta: form.historicoDataColeta,
        historicoObservacao: form.historicoObservacao.trim() || null,
      });

      limparFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar histórico de fermentação:", error);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onClose={fecharModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
        Novo registro de fermentação
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            select
            label="Lote"
            value={form.loteId}
            onChange={(event) => alterarCampo("loteId", event.target.value)}
            error={!!errors.loteId}
            helperText={errors.loteId}
            fullWidth
            required
            sx={{ gridColumn: "1 / -1" }}
          >
            {lotes.map((lote) => (
              <MenuItem key={lote.loteId} value={lote.loteId}>
                {lote.loteDescricao}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="pH"
            type="number"
            value={form.historicoPh}
            onChange={(event) => alterarCampo("historicoPh", event.target.value)}
            error={!!errors.historicoPh}
            helperText={errors.historicoPh}
            fullWidth
            required
          />
          <TextField
            label="Temperatura"
            type="number"
            value={form.historicoTemperatura}
            onChange={(event) =>
              alterarCampo("historicoTemperatura", event.target.value)
            }
            error={!!errors.historicoTemperatura}
            helperText={errors.historicoTemperatura}
            fullWidth
            required
          />
          <TextField
            label="Extrato"
            type="number"
            value={form.historicoExtrato}
            onChange={(event) =>
              alterarCampo("historicoExtrato", event.target.value)
            }
            error={!!errors.historicoExtrato}
            helperText={errors.historicoExtrato}
            fullWidth
            required
          />
          <TextField
            label="Data da coleta"
            type="datetime-local"
            value={form.historicoDataColeta}
            onChange={(event) =>
              alterarCampo("historicoDataColeta", event.target.value)
            }
            error={!!errors.historicoDataColeta}
            helperText={errors.historicoDataColeta}
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Responsável"
            value={form.historicoResponsavel}
            onChange={(event) =>
              alterarCampo("historicoResponsavel", event.target.value)
            }
            error={!!errors.historicoResponsavel}
            helperText={errors.historicoResponsavel}
            fullWidth
            required
            sx={{ gridColumn: "1 / -1" }}
          />
          <TextField
            label="Observação"
            value={form.historicoObservacao}
            onChange={(event) =>
              alterarCampo("historicoObservacao", event.target.value)
            }
            error={!!errors.historicoObservacao}
            helperText={errors.historicoObservacao}
            fullWidth
            multiline
            minRows={3}
            sx={{ gridColumn: "1 / -1" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={fecharModal} disabled={salvando}>
          Cancelar
        </Button>

        <Button
          onClick={salvar}
          disabled={salvando}
          variant="contained"
          sx={{
            backgroundColor: "#FFC524",
            color: "#000",
            "&:hover": { backgroundColor: "#e6b020" },
          }}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
