using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.FermentacaoHistorico;

public class FermentacaoHistoricoDto
{

    [Required]
    public int LoteId { get; set; }

    [Required]
    public decimal HistoricoPh { get; set; }

    [Required]
    public decimal HistoricoTemperatura { get; set; }

    [Required]
    public decimal HistoricoExtrato { get; set; }

    [MaxLength(2000)]
    public string? HistoricoObservacao { get; set; }

    [Required]
    [MaxLength(200)]
    public string HistoricoResponsavel { get; set; } = string.Empty;

    [Required]
    public DateTime HistoricoDataColeta { get; set; }
}