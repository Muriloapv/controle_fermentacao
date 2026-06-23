using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Models.Lote
{
    public class Lote
    {
        public int LoteId { get; set; }

        [MaxLength(200)]
        public string LoteDescricao { get; set; } = string.Empty;

        [Precision(10, 2)]
        public decimal LoteQuantidade { get; set; }

        [MaxLength(2000)]
        public string? LoteObservacao { get; set; }

        public int TanqueId { get; set; }

        public int CervejaId { get; set; }

        public DateTime LoteInicio { get; set; }

        public DateTime? LoteFinalizacao { get; set; }
    }
}