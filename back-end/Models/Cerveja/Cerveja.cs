using System.ComponentModel.DataAnnotations;

namespace arBrain.Models.Cerveja
{
    public class Cerveja
    {
        public int CervejaId { get; set; }

        [MaxLength(200)]
        public string CervejaNome { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? CervejaObservacao { get; set; }

        public int CervejaEstiloId { get; set; }

        public CervejaEstilo CervejaEstilo { get; set; } = null!;

        public DateTime CervejaInclusao { get; set; } = DateTime.UtcNow;

        public DateTime? CervejaExclusao { get; set; }
    }
}