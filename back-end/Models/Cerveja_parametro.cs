namespace arBrain.Models
{
    public class Cerveja_parametro
    {
        public int CervejaParametro_id  { get; set; }   
        public decimal CervejaParametro_temperaturaMin { get; set; }

        public decimal CervejaParametro_temperaturaMax { get; set; }

        public decimal CervejaParametro_phMin { get; set; }

        public decimal CervejaParametro_phMax { get; set; }

        public decimal CervejaParametro_extratoMin { get; set; }

        public decimal CervejaParametro_extratoMax { get; set; }

        public string CervejaParametro_observacao { get; set; }

        public DateTime CervejaParametro_inclusao { get; set; }

        public DateTime CervejaParametro_exclusao { get; set; }
    }
}