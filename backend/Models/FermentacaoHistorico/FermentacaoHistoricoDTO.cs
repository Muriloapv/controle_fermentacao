using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.FermentacaoHistorico;

public class FermentacaoHistoricoDto
{

    [Required]
    public int LoteId { get; set; }

    [Required]
    [Range( 0.001, 99999.999, ErrorMessage = "O pH deve ser maior que zero.")]
    public decimal HistoricoPh { get; set; }

    [Required]
    [Range(0.01, 99999.99, ErrorMessage = "O temperatura deve ser maior que zero.")]
    public decimal HistoricoTemperatura { get; set; }

    [Required]
    [Range(0.01, 99999.99, ErrorMessage = "O extrato deve ser maior que zero.")]
    public decimal HistoricoExtrato { get; set; }

    [MaxLength(2000)]
    public string? HistoricoObservacao { get; set; }

    [Required]
    [MaxLength(200)]
    public string HistoricoResponsavel { get; set; } = string.Empty;

    [Required]
    public DateTime HistoricoDataColeta { get; set; }
}

public class LoteParametroAtualDto
{
    public int LoteId { get; set; }
    public string LoteDescricao { get; set; } = string.Empty;

    public decimal CervejaParametroExtratoMin { get; set; }
    public decimal CervejaParametroExtratoMax { get; set; }

    public decimal CervejaParametroTemperaturaMin { get; set; }
    public decimal CervejaParametroTemperaturaMax { get; set; }
    public decimal CervejaParametroPhMin { get; set; }
    public decimal CervejaParametroPhMax { get; set; }

    public string temperatura_padrao { get; set; }
    public string ph_padrao { get; set; }

    public string extrato_padrao { get; set; }
}