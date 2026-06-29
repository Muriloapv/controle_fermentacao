import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaEstilo } from "../models/CrevejaEstilo";

type Props = {
  open: boolean;
  onClose: () => void;
  estilo: CervejaEstilo | null;
  onSuccess: () => void;
};

type EstiloForm = {
  cervejaEstiloDescricao: string;
  cervejaEstiloObservacao: string;
};

const formInicial: EstiloForm = {
  cervejaEstiloDescricao: "",
  cervejaEstiloObservacao: "",
};

export default function CervejaEstiloCadastroModal({ open, onClose, estilo, onSuccess, }: Props) {
  const [form, setForm] = useState<EstiloForm>(formInicial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  // Mantém o mesmo modal para cadastro e edição, preenchendo o formulário quando houver estilo selecionado.
  useEffect(() => {
    if (open && estilo) {
      setForm({
        cervejaEstiloDescricao: estilo.cervejaEstiloDescricao,
        cervejaEstiloObservacao: estilo.cervejaEstiloObservacao || "",
      });

      setErrors({});
    }

    if (open && !estilo) {
      setForm(formInicial);
      setErrors({});
    }
  }, [open, estilo]);

  function alterarCampo(campo: keyof EstiloForm, valor: string) {
    
    
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

  function validarFormulario() {
    const novosErros: Record<string, string> = {};

    if (!form.cervejaEstiloDescricao.trim()) {
      novosErros.cervejaEstiloDescricao = "Informe a descrição do estilo.";
    } else if (form.cervejaEstiloDescricao.length > 200) {
      novosErros.cervejaEstiloDescricao =
        "A descrição deve ter no máximo 200 caracteres.";
    }

    if (form.cervejaEstiloObservacao.length > 2000) {
      novosErros.cervejaEstiloObservacao =
        "A observação deve ter no máximo 2000 caracteres.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validarFormulario()) return;
    try {
      setSalvando(true);

      // Edição segue o padrão de histórico: exclui logicamente o registro atual e cria um novo.
      if (estilo) {
        await axios.delete(
          'http://localhost:5298/api/CervejaEstilo/' + estilo.cervejaEstiloId
        );
      }

      await axios.post("http://localhost:5298/api/CervejaEstilo", {
        cervejaEstiloDescricao: form.cervejaEstiloDescricao.trim(),
        cervejaEstiloObservacao: form.cervejaEstiloObservacao.trim() || null,
      });

      limparFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar estilo:", error);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onClose={fecharModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
        {estilo ? "Editar estilo" : "Novo estilo"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Descrição"
          value={form.cervejaEstiloDescricao}
          onChange={(event) => alterarCampo("cervejaEstiloDescricao", event.target.value)}
          error={!!errors.cervejaEstiloDescricao}
          helperText={errors.cervejaEstiloDescricao}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Observação"
          value={form.cervejaEstiloObservacao}
          onChange={(event) => alterarCampo("cervejaEstiloObservacao", event.target.value) }
          error={!!errors.cervejaEstiloObservacao}
          helperText={errors.cervejaEstiloObservacao}
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
