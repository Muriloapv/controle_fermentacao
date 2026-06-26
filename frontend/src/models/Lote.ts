export interface Lote {
   lote_id           : number;
   lote_descricao    : string;
   lote_quantidade   : number;
   lote_observacao   : string | null;
   tanque_id         : number;
   cerveja_id        : number;
   lote_inicio       : string;
   lote_finalizacao  : string | null;
}