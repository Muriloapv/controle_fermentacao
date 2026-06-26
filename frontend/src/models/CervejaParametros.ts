export interface CervejaParametros {
   parametro_id             : number;
   cerveja_id               : number;
   parametro_temperatura_min: number;
   parametro_temperatura_max: number;
   parametro_ph_min         : number;
   parametro_ph_max         : number;
   parametro_extrato_min    : number;
   parametro_extrato_max    : number;
   parametro_observacao     : string | null;
   parametro_inclusao       : string;
}