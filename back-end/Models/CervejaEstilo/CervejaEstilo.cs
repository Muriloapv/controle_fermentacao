using System.ComponentModel.DataAnnotations;

namespace arBrain.Models.CervejaEstilo
{
    public class CervejaEstilo
    {
        public int CervejaEstiloId { get; set; }

        [MaxLength(200)]
        public string CervejaEstiloDescricao { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? CervejaEstiloObservacao { get; set; }

        public DateTime CervejaEstiloInclusao { get; set; } = DateTime.UtcNow;

        public DateTime? CervejaEstiloExclusao { get; set; }
    }
}