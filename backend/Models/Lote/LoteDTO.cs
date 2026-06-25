using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.Lote;

public class LoteDto
{
    [Required]
    [MaxLength(200)]
    public string LoteDescricao { get; set; } = string.Empty;

    [Required]
    public decimal LoteQuantidade { get; set; }

    [MaxLength(2000)]
    public string? LoteObservacao { get; set; }

    [Required]
    public int TanqueId { get; set; }

    [Required]
    public int CervejaId { get; set; }

    [Required]
    public DateTime LoteInicio { get; set; }

    public DateTime? LoteFinalizacao { get; set; }
}