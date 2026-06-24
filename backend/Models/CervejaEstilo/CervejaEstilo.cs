using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace arBrain.Models;

public class CervejaEstilo
{
    [Key]
    public int CervejaEstiloId { get; set; }

    [Required]
    [MaxLength(200)]
    public string CervejaEstiloDescricao { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? CervejaEstiloObservacao { get; set; }

    public DateTime CervejaEstiloInclusao { get; set; } = DateTime.UtcNow;

    [JsonIgnore]
    public DateTime? CervejaEstiloExclusao { get; set; }

    public ICollection<Cerveja> Cervejas { get; set; } = new List<Cerveja>();

}