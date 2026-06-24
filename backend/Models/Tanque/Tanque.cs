using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Models.Tanque;

public class Tanque
{
    public int TanqueId { get; set; }

    [MaxLength(200)]
    public string TanqueDescricao { get; set; } = string.Empty;

    [Precision(10, 2)]
    public decimal TanqueCapacidade { get; set; }

    [MaxLength(2000)]
    public string? TanqueObservacao { get; set; }

    public DateTime TanqueInclusao { get; set; } = DateTime.UtcNow;

    public DateTime? TanqueExclusao { get; set; }
}