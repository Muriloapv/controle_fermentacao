import { Box, Button,Dialog, DialogActions, DialogContent,DialogTitle, MenuItem, TextField, Typography,} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CervejaEstilo } from "../models/CrevejaEstilo";
import type { Cerveja } from "../models/Cerveja";
import type { CervejaParametros } from "../models/CervejaParametros";

type Props = {
  open: boolean;
  cerveja: Cerveja | null;
  onClose: () => void;
  onSuccess: () => void;
};

type CervejaForm = {
  cervejaNome: string;
  cervejaEstiloId: string;
  cervejaObservacao: string;
  temperaturaMin: string;
  temperaturaMax: string;
  phMin: string;
  phMax: string;
  extratoMin: string;
  extratoMax: string;
  observacaoParametro: string;
};

const formInicial: CervejaForm = {
  cervejaNome: "",
  cervejaEstiloId: "",
  cervejaObservacao: "",
  temperaturaMin: "",
  temperaturaMax: "",
  phMin: "",
  phMax: "",
  extratoMin: "",
  extratoMax: "",
  observacaoParametro: "",
};

export default function CervejaCadastroModal({ open, onClose, cerveja, onSuccess, }: Props) {
  const [form, setForm] = useState<CervejaForm>(formInicial);
  const [estilos, setEstilos] = useState<CervejaEstilo[]>([]);
  const [parametroSelecionado, setParametroSelecionado] = useState<CervejaParametros | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  // Ao abrir o modal, carrega os estilos e preenche os dados quando estiver em modo de edição.
  useEffect(() => {
    if (open) {
      carregarEstilos();
      carregarDadosEdicao();
    }
  }, [open, cerveja]);

  // A listagem de cervejas não traz os parâmetros; por isso eles são buscados separadamente na edição.
  async function carregarDadosEdicao() {
    if (!cerveja) {
      setForm(formInicial);
      setParametroSelecionado(null);
      setErrors({});
      return;
    }

    try {
      const parametrosResponse = await axios.get<CervejaParametros[]>(
        "http://localhost:5298/api/CervejaParametro"
      );

      const parametro = parametrosResponse.data.find(
        (item) => item.cervejaId === cerveja.cervejaId
      );

      setParametroSelecionado(parametro || null);

      setForm({
        cervejaNome: cerveja.cervejaNome,
        cervejaEstiloId: String(cerveja.cervejaEstiloId),
        cervejaObservacao: cerveja.cervejaObservacao || "", 
        temperaturaMin: parametro ? String(parametro.cervejaParametroTemperaturaMin) : "",
        temperaturaMax: parametro ? String(parametro.cervejaParametroTemperaturaMax) : "",
        phMin: parametro ? String(parametro.cervejaParametroPhMin) : "",
        phMax: parametro ? String(parametro.cervejaParametroPhMax) : "",
        extratoMin: parametro ? String(parametro.cervejaParametroExtratoMin) : "",
        extratoMax: parametro ? String(parametro.cervejaParametroExtratoMax) : "",
        observacaoParametro: parametro?.cervejaParametroObservacao || "",
      });

      setErrors({});
    } catch (error) {
      console.error("Erro ao carregar dados da edição:", error);
    }
  }

  async function carregarEstilos() {
    try {
      const response = await axios.get<CervejaEstilo[]>(
        "http://localhost:5298/api/CervejaEstilo"
      );

      setEstilos(response.data);
    } catch (error) {
      console.error("Erro ao carregar estilos:", error);
    }
  }

  // Atualiza um campo do formulário e limpa o erro associado a ele.
  function alterarCampo(campo: keyof CervejaForm, valor: string) {
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
    setParametroSelecionado(null);
    setErrors({});
  }

  function fecharModal() {
    limparFormulario();
    onClose();
  }

  // Valida todos os campos obrigatórios da cerveja e dos parâmetros de fermentação.
  function validarFormulario() {
    const novosErros: Record<string, string> = {};

    if ( !form.cervejaNome.trim() ) {
      novosErros.cervejaNome = "Informe o nome da cerveja.";
    } else if ( form.cervejaNome.length > 200 ) {
      novosErros.cervejaNome = "O nome deve ter no máximo 200 caracteres.";
    }

    if (!form.cervejaEstiloId) {
      novosErros.cervejaEstiloId = "Selecione um estilo.";
    }

    if (form.cervejaObservacao.length > 2000) {
      novosErros.cervejaObservacao =
        "A observação deve ter no máximo 2000 caracteres.";
    }

    validarNumeroObrigatorio( "temperaturaMin", "Informe a temperatura mínima.", novosErros);
    validarNumeroObrigatorio( "temperaturaMax", "Informe a temperatura máxima.", novosErros );
    validarNumeroObrigatorio( "phMin", "Informe o pH minimo.", novosErros );
    validarNumeroObrigatorio( "phMax", "Informe o pH máximo.", novosErros );
    validarNumeroObrigatorio( "extratoMin","Informe o extrato minimo.", novosErros );
    validarNumeroObrigatorio( "extratoMax", "Informe o extrato máximo.", novosErros );

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  // Verifica se um campo numérico do formulário está preenchido e é maior que zero.
  function validarNumeroObrigatorio( campo: keyof CervejaForm, mensagem: string, novosErros: Record<string, string> ) {
    const valor = Number(form[campo]);

    if ( !form[campo] ) {
      novosErros[campo] = mensagem;
    } else if ( Number.isNaN(valor) || valor <= 0) {
      novosErros[campo] = "Informe um valor maior que zero.";
    }
  }

  async function salvar() {
    if ( !validarFormulario() ) return;

    try {
      setSalvando(true);

      // Na edição, remove logicamente os registros antigos antes de criar a nova versão.
      if (cerveja) {
        if (parametroSelecionado) {
          await axios.delete(
            "http://localhost:5298/api/CervejaParametro/" +
              parametroSelecionado.cervejaParametroId
          );
        }

        await axios.delete(
          "http://localhost:5298/api/Cervejas/" + cerveja.cervejaId
        );
      }

      const cervejaResponse = await axios.post(
        "http://localhost:5298/api/Cervejas",
        {
          cervejaNome      : form.cervejaNome.trim(),
          cervejaEstiloId  : Number( form.cervejaEstiloId) ,
          cervejaObservacao: form.cervejaObservacao.trim() || null,
        }
      );

      await axios.post("http://localhost:5298/api/CervejaParametro", {
        cervejaId                     : cervejaResponse.data.cervejaId,
        cervejaParametroTemperaturaMin: Number(form.temperaturaMin),
        cervejaParametroTemperaturaMax: Number(form.temperaturaMax),
        cervejaParametroPhMin         : Number(form.phMin),
        cervejaParametroPhMax         : Number(form.phMax),
        cervejaParametroExtratoMin    : Number(form.extratoMin),
        cervejaParametroExtratoMax    : Number(form.extratoMax),
        cervejaParametroObservacao    : form.observacaoParametro,
      });

      limparFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar cerveja:", error);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onClose={fecharModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
         {cerveja ? "Editar cerveja" : "Nova cerveja"}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField label="Nome da cerveja" value={form.cervejaNome} onChange={(event) => alterarCampo("cervejaNome", event.target.value) }
            error={!!errors.cervejaNome}
            helperText={errors.cervejaNome}
            fullWidth
            required
            sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }}
          />

          <TextField select label="Estilo" value={form.cervejaEstiloId} onChange={(event) => alterarCampo("cervejaEstiloId", event.target.value)}
            error={!!errors.cervejaEstiloId}
            helperText={errors.cervejaEstiloId}
            fullWidth
            required
            sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }}
          >
            {estilos.map((estilo) => ( 
              <MenuItem
                key={estilo.cervejaEstiloId}
                value={estilo.cervejaEstiloId}
              >
                {estilo.cervejaEstiloDescricao}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Observação"
            value={form.cervejaObservacao}
            onChange={(event) =>
              alterarCampo("cervejaObservacao", event.target.value)
            }
            error={!!errors.cervejaObservacao}
            helperText={errors.cervejaObservacao}
            fullWidth
            multiline
            minRows={2}
            sx={{ gridColumn: "1 / -1" }}
          />

          <Box sx={{ gridColumn: "1 / -1", border: "1px solid", borderColor: "divider", borderRadius: 1, p: 2, mt: 1, }}>
            <Typography sx={{ color: "#0b3551", fontSize: "0.85rem", fontWeight: 700, mb: 2, }}>
              Parâmetros de fermentação
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, }}>
              <TextField
                label="Temp. mín (C)"
                type="number"
                value={form.temperaturaMin}
                onChange={(event) =>
                  alterarCampo("temperaturaMin", event.target.value)
                }
                error={!!errors.temperaturaMin}
                helperText={errors.temperaturaMin}
                fullWidth
                required
              />

              <TextField
                label="Temp. máx (C)"
                type="number"
                value={form.temperaturaMax}
                onChange={(event) =>
                  alterarCampo("temperaturaMax", event.target.value)
                }
                error={!!errors.temperaturaMax}
                helperText={errors.temperaturaMax}
                fullWidth
                required
              />

              <TextField
                label="pH mín"
                type="number"
                value={form.phMin}
                onChange={(event) => alterarCampo("phMin", event.target.value)}
                error={!!errors.phMin}
                helperText={errors.phMin}
                fullWidth
                required
              />

              <TextField
                label="pH máx"
                type="number"
                value={form.phMax}
                onChange={(event) => alterarCampo("phMax", event.target.value)}
                error={!!errors.phMax}
                helperText={errors.phMax}
                fullWidth
                required
              />

              <TextField
                label="Extrato mín (P)"
                type="number"
                value={form.extratoMin}
                onChange={(event) =>
                  alterarCampo("extratoMin", event.target.value)
                }
                error={!!errors.extratoMin}
                helperText={errors.extratoMin}
                fullWidth
                required
              />

              <TextField
                label="Extrato máx (P)"
                type="number"
                value={form.extratoMax}
                onChange={(event) =>
                  alterarCampo("extratoMax", event.target.value)
                }
                error={!!errors.extratoMax}
                helperText={errors.extratoMax}
                fullWidth
                required
              />
            </Box>
          </Box>
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
