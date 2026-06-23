using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace arBrain.Models
{
    public class Lote
    {
        public int Lote_id { get; set; }    

        public string Lote_descricao { get; set; }

        public decimal Lote_quantidade { get; set; }

        public string? Lote_observacao { get; set; }
           
        public int Tanque_id { get; set; }

        public int Cerveja_id { get; set; }

        public DateTime Lote_inicio { get; set; }

        public DateTime? Lote_finalizacao { get; set; }
        
    }
}