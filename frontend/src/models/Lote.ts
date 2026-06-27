export interface Lote {
  loteId          : number;
  loteDescricao   : string;
  loteQuantidade  : number;
  loteObservacao  : string | null;
  tanqueId        : number;
  cervejaId       : number;
  loteInicio      : string;
  loteFinalizacao : string | null;
}