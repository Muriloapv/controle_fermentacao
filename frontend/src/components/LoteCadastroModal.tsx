import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Cerveja } from "../models/Cerveja";
import type { Lote } from "../models/Lote";
import type { Tanque } from "../models/Tanque";

type Props = {
  open: boolean;
  lote: Lote | null;
  onClose: () => void;
  onSuccess: () => void;
};

type LoteForm = {
  loteDescricao  : string;
  loteQuantidade : string;
  loteObservacao : string;
  tanqueId       : string;
  cervejaId      : string;
  loteInicio     : string;
  loteFinalizacao: string;
};

const formInicial: LoteForm = {
  loteDescricao  : "",
  loteQuantidade : "",
  loteObservacao : "",
  tanqueId       : "",
  cervejaId      : "",
  loteInicio     : "",
  loteFinalizacao: "",
};

// Inputs do tipo date esperam o formato yyyy-MM-dd; a API pode retornar data com horário.
function formatarDataInput(data: string | null) {
  if (!data) return "";
  return data.slice(0, 10);
}

export default function LoteCadastroModal({ open, lote, onClose, onSuccess }: Props) {
  const [form    , setForm    ] = useState<LoteForm>(formInicial);
  const [tanques , setTanques ] = useState<Tanque[]>([]);
  const [cervejas, setCervejas] = useState<Cerveja[]>([]);
  const [errors  , setErrors  ] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!open) return;

    carregarOpcoes();

    if (lote) {
      setForm({
        loteDescricao   : lote.loteDescricao,
        loteQuantidade  : String(lote.loteQuantidade),
        loteObservacao  : lote.loteObservacao || "",
        tanqueId        : String(lote.tanqueId),
        cervejaId       : String(lote.cervejaId),
        loteInicio      : formatarDataInput(lote.loteInicio),
        loteFinalizacao : formatarDataInput(lote.loteFinalizacao),
      });
    } else {
      setForm(formInicial);
    }

    setErrors({});
  }, [open, lote]);

  // Lotes dependem de tanque e cerveja, então as opções dos selects são carregadas ao abrir o modal.
  async function carregarOpcoes() {
    try {
      const [tanquesResponse, cervejasResponse] = await Promise.all([
        axios.get<Tanque[]>("http://localhost:5298/api/tanque"),
        axios.get<Cerveja[]>("http://localhost:5298/api/Cervejas"),
      ]);

      setTanques(tanquesResponse.data);
      setCervejas(cervejasResponse.data);
    } catch (error) {
      console.error("Erro ao carregar opções do lote:", error);
    }
  }

  function alterarCampo(campo: keyof LoteForm, valor: string) {
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

  function validarFormulario() {
    const novosErros: Record<string, string> = {};
    const quantidade = Number(form.loteQuantidade);

    if (!form.loteDescricao.trim()) {
      novosErros.loteDescricao = "Informe a descrição do lote.";
    } else if (form.loteDescricao.length > 200) {
      novosErros.loteDescricao = "A descrição deve ter no máximo 200 caracteres.";
    }

    if (!form.loteQuantidade) {
      novosErros.loteQuantidade = "Informe a quantidade.";
    } else if (Number.isNaN(quantidade) || quantidade <= 0) {
      novosErros.loteQuantidade = "Informe uma quantidade maior que zero.";
    }

    if (!form.tanqueId) {
      novosErros.tanqueId = "Selecione um tanque.";
    }

    if (!form.cervejaId) {
      novosErros.cervejaId = "Selecione uma cerveja.";
    }

    if (!form.loteInicio) {
      novosErros.loteInicio = "Informe a data de início.";
    }

    if (form.loteFinalizacao && form.loteInicio && form.loteFinalizacao < form.loteInicio) {
      novosErros.loteFinalizacao = "A finalização deve ser maior ou igual ao início.";
    }

    if (form.loteObservacao.length > 2000) {
      novosErros.loteObservacao = "A observação deve ter no máximo 2000 caracteres.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validarFormulario()) return;

    try {
      setSalvando(true);

      // Na edição, o lote anterior é excluído logicamente e um novo registro é criado.
      if (lote) {
        await axios.delete("http://localhost:5298/api/lote/" + lote.loteId);
      }

      await axios.post("http://localhost:5298/api/lote", {
        loteDescricao  : form.loteDescricao.trim(),
        loteQuantidade : Number(form.loteQuantidade),
        loteObservacao : form.loteObservacao.trim() || null,
        tanqueId       : Number(form.tanqueId),
        cervejaId      : Number(form.cervejaId),
        loteInicio     : form.loteInicio,
        loteFinalizacao: form.loteFinalizacao || null,
      });

      limparFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar lote:", error);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onClose={fecharModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
        {lote ? "Editar lote" : "Novo lote"}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="Descrição"
            value={form.loteDescricao}
            onChange={(event) => alterarCampo("loteDescricao", event.target.value)}
            error={!!errors.loteDescricao}
            helperText={errors.loteDescricao}
            fullWidth
            required
            sx={{ gridColumn: "1 / -1" }}
          />
          <TextField
            label="Quantidade (L)"
            type="number"
            value={form.loteQuantidade}
            onChange={(event) => alterarCampo("loteQuantidade", event.target.value)}
            error={!!errors.loteQuantidade}
            helperText={errors.loteQuantidade}
            fullWidth
            required
          />
          <TextField
            select
            label="Tanque"
            value={form.tanqueId}
            onChange={(event) => alterarCampo("tanqueId", event.target.value)}
            error={!!errors.tanqueId}
            helperText={errors.tanqueId}
            fullWidth
            required
          >
            {tanques.map((tanque) => (
              <MenuItem key={tanque.tanqueId} value={tanque.tanqueId}>
                {tanque.tanqueDescricao}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Cerveja"
            value={form.cervejaId}
            onChange={(event) => alterarCampo("cervejaId", event.target.value)}
            error={!!errors.cervejaId}
            helperText={errors.cervejaId}
            fullWidth
            required
          >
            {cervejas.map((cerveja) => (
              <MenuItem key={cerveja.cervejaId} value={cerveja.cervejaId}>
                {cerveja.cervejaNome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Início"
            type="date"
            value={form.loteInicio}
            onChange={(event) => alterarCampo("loteInicio", event.target.value)}
            error={!!errors.loteInicio}
            helperText={errors.loteInicio}
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Finalização"
            type="date"
            value={form.loteFinalizacao}
            onChange={(event) => alterarCampo("loteFinalizacao", event.target.value)}
            error={!!errors.loteFinalizacao}
            helperText={errors.loteFinalizacao}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Observação"
            value={form.loteObservacao}
            onChange={(event) => alterarCampo("loteObservacao", event.target.value)}
            error={!!errors.loteObservacao}
            helperText={errors.loteObservacao}
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
