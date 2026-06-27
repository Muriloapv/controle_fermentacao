export interface CervejaParametros {
  cervejaParametroId             : number;
  cervejaId                      : number;
  cervejaParametroTemperaturaMin : number;
  cervejaParametroTemperaturaMax : number;
  cervejaParametroPhMin          : number;
  cervejaParametroPhMax          : number;
  cervejaParametroExtratoMin     : number;
  cervejaParametroExtratoMax     : number;
  cervejaParametroObservacao     : string | null;
}