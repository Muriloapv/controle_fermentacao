import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

type StatusPadrao = "ok" | "acima" | "abaixo";
type UltimoRegistroFermentacao = {
  loteId: number;
  loteDescricao: string;
  cervejaParametroExtratoMin: number;
  cervejaParametroExtratoMax: number;
  cervejaParametroTemperaturaMin: number;
  cervejaParametroTemperaturaMax: number;
  cervejaParametroPhMin: number;
  cervejaParametroPhMax: number;
  temperatura_padrao: StatusPadrao;
  ph_padrao: StatusPadrao;
  extrato_padrao: StatusPadrao;
};

type DashboardIndicadores = {
  total: number;
  dentroPadrao: number;
  requerAtencao: number;
  foraPadrao: number;
};

const indicadoresIniciais: DashboardIndicadores = {
  total: 0,
  dentroPadrao: 0,
  requerAtencao: 0,
  foraPadrao: 0,
};

export default function DashboardPage() {
  const [indicadores, setIndicadores] = useState<DashboardIndicadores>(indicadoresIniciais);
  const [loading    , setLoading    ] = useState(true);

  useEffect(() => {
    carregarIndicadores();
  }, []);

  // Busca o último registro de fermentação de cada lote ativo e computa os indicadores do dashboard.
  async function carregarIndicadores() {
    try {
      setLoading(true);

      const response = await axios.get<UltimoRegistroFermentacao[]>(
        "http://localhost:5298/api/FermentacaoHistorico/ultimos-registros"
      );

      setIndicadores(calcularIndicadores(response.data));
    } catch (error) {
      console.error("Erro ao carregar indicadores do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  // Classifica cada lote: 0 parâmetros fora = dentro do padrão; 1 = requer atenção; 2+ = fora do padrão.
  function calcularIndicadores(registros: UltimoRegistroFermentacao[]) {
    const totais = { ...indicadoresIniciais, total: registros.length };

    registros.forEach((registro) => {
      const foraDoPadrao = [
        registro.temperatura_padrao,
        registro.ph_padrao,
        registro.extrato_padrao,
      ].filter((status) => status === "acima" || status === "abaixo").length;

      if (foraDoPadrao === 0) {
        totais.dentroPadrao += 1;
      } else if (foraDoPadrao === 1) {
        totais.requerAtencao += 1;
      } else {
        totais.foraPadrao += 1;
      }
    });

    return totais;
  }

  const cards = [
    {
      titulo: "Total de registros fermentativos",
      valor: indicadores.total,
      cor: "#0B3551",
    },
    {
      titulo: "Registros dentro do padrão",
      valor: indicadores.dentroPadrao,
      cor: "#166534",
    },
    {
      titulo: "Registros que requerem alteração",
      valor: indicadores.requerAtencao,
      cor: "#B45309",
    },
    {
      titulo: "Registros fora do padrão",
      valor: indicadores.foraPadrao,
      cor: "#B91C1C",
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
          Dashboard
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)", }, gap: 2, }}>
          {cards.map((card) => (
            <Box
              key={card.titulo}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#475569",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {card.titulo}
              </Typography>
              <Typography
                sx={{
                  color: card.cor,
                  fontSize: "2rem",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {card.valor}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
