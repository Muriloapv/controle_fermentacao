using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace arBrain.Models;

public class Cerveja
{
    [Key]
    public int CervejaId { get; set; }

    [Required]
    [MaxLength(200)]
    public string CervejaNome { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? CervejaObservacao { get; set; }

    public int CervejaEstiloId { get; set; }

    public CervejaEstilo CervejaEstilo { get; set; } = null!;

    public DateTime CervejaInclusao { get; set; } = DateTime.UtcNow;

    // [JsonIgnore]
    public DateTime? CervejaExclusao { get; set; }
}