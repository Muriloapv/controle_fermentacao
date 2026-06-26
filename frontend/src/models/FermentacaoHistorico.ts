export interface FermentacaoHistorico {
   historico_id         : number;
   lote_id              : number;
   historico_ph         : number;
   historico_temperatura: number;
   historico_extrato    : number;
   historico_observacao : string | null;
   historico_responsavel: string;
   historico_data_coleta: string;
}