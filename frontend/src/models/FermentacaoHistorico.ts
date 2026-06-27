export interface FermentacaoHistorico {
  historicoId         : number;
  loteId              : number;
  historicoPh         : number;
  historicoTemperatura: number;
  historicoExtrato    : number;
  historicoObservacao : string | null;
  historicoResponsavel: string;
  historicoDataColeta : string;
}