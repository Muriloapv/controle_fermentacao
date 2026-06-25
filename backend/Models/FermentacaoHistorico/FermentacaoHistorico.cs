using System.ComponentModel.DataAnnotations;
using arBrain.Models.Lote;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Models.FermentacaoHistorico;

public class FermentacaoHistorico
{
    [Key]
    public int HistoricoId { get; set; }

    public int LoteId { get; set; }
    public Lote.Lote? Lote { get; set; }

    [Precision(5, 3)]
    public decimal HistoricoPh { get; set; }

    [Precision(5, 2)]
    public decimal HistoricoTemperatura { get; set; }

    [Precision(5, 2)]
    public decimal HistoricoExtrato { get; set; }

    [MaxLength(2000)]
    public string? HistoricoObservacao { get; set; }

    [MaxLength(200)]
    public string HistoricoResponsavel { get; set; } = string.Empty;

    public DateTime HistoricoDataColeta { get; set; }
}