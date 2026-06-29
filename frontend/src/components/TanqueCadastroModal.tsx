import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Tanque } from "../models/Tanque";

type Props = {
  open: boolean;
  tanque: Tanque | null;
  onClose: () => void;
  onSuccess: () => void;
};

type TanqueForm = {
  tanqueDescricao: string;
  tanqueCapacidade: string;
  tanqueObservacao: string;
};

const formInicial: TanqueForm = {
  tanqueDescricao: "",
  tanqueCapacidade: "",
  tanqueObservacao: "",
};

export default function TanqueCadastroModal({ open, tanque, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<TanqueForm>(formInicial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (tanque) {
      setForm({
        tanqueDescricao: tanque.tanqueDescricao,
        tanqueCapacidade: String(tanque.tanqueCapacidade),
        tanqueObservacao: tanque.tanqueObservacao || "",
      });
    } else {
      setForm(formInicial);
    }

    setErrors({});
  }, [open, tanque]);

  // Atualiza um campo do formulário e limpa o erro associado a ele.
  function alterarCampo(campo: keyof TanqueForm, valor: string) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));

    setErrors((atual) => ({
      ...atual,
      [campo]: "",
    }));
  }

  function limparFormulario() {
    setForm(formInicial);
    setErrors({});
  }

  function fecharModal() {
    limparFormulario();
    onClose();
  }

  // Valida descrição e capacidade do tanque antes de salvar.
  function validarFormulario() {
    const novosErros: Record<string, string> = {};
    const capacidade = Number(form.tanqueCapacidade);

    if (!form.tanqueDescricao.trim()) {
      novosErros.tanqueDescricao = "Informe a descrição do tanque.";
    } else if (form.tanqueDescricao.length > 200) {
      novosErros.tanqueDescricao = "A descrição deve ter no máximo 200 caracteres.";
    }

    if (!form.tanqueCapacidade) {
      novosErros.tanqueCapacidade = "Informe a capacidade.";
    } else if (Number.isNaN(capacidade) || capacidade <= 0) {
      novosErros.tanqueCapacidade = "Informe uma capacidade maior que zero.";
    }

    if (form.tanqueObservacao.length > 2000) {
      novosErros.tanqueObservacao = "A observação deve ter no máximo 2000 caracteres.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validarFormulario()) return;

    try {
      setSalvando(true);

      // Na edição, o tanque anterior é excluído logicamente antes de criar a nova versão, a fim de manter um histórico de edições.
      if (tanque) {
        await axios.delete("http://localhost:5298/api/tanque/" + tanque.tanqueId);
      }

      await axios.post("http://localhost:5298/api/tanque", {
        tanqueDescricao: form.tanqueDescricao.trim(),
        tanqueCapacidade: Number(form.tanqueCapacidade),
        tanqueObservacao: form.tanqueObservacao.trim() || null,
      });

      limparFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tanque:", error);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onClose={fecharModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
        {tanque ? "Editar tanque" : "Novo tanque"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Descrição"
          value={form.tanqueDescricao}
          onChange={(event) => alterarCampo("tanqueDescricao", event.target.value)}
          error={!!errors.tanqueDescricao}
          helperText={errors.tanqueDescricao}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Capacidade (L)"
          type="number"
          value={form.tanqueCapacidade}
          onChange={(event) => alterarCampo("tanqueCapacidade", event.target.value)}
          error={!!errors.tanqueCapacidade}
          helperText={errors.tanqueCapacidade}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Observação"
          value={form.tanqueObservacao}
          onChange={(event) => alterarCampo("tanqueObservacao", event.target.value)}
          error={!!errors.tanqueObservacao}
          helperText={errors.tanqueObservacao}
          fullWidth
          multiline
          minRows={3}
        />
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
