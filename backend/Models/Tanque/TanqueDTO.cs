using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.Tanque;

public class TanqueDto
{

    [Required]
    [MaxLength(200)]
    public string TanqueDescricao { get; set; } = string.Empty;

    [Required]
    public decimal TanqueCapacidade { get; set; }

    [MaxLength(2000)]
    public string? TanqueObservacao { get; set; }

}