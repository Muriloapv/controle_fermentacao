using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.CervejaParametro;

public class CervejaParametroDto
{
   [Range(1, int.MaxValue, ErrorMessage = "O campo CervejaId deve ser maior que zero.")]
   public int CervejaId { get; set; }

   [Range( 0.01, 99999.99, ErrorMessage = "A temperatura mínima deve ser maior que zero.")]
   public decimal CervejaParametroTemperaturaMin { get; set; }

   [Range( 0.01, 99999.99, ErrorMessage = "A temperatura máxima deve ser maior que zero.")]
   public decimal CervejaParametroTemperaturaMax { get; set; }

   [Range( 0.001, 99999.999, ErrorMessage = "O pH mínimo deve ser maior que zero.")]
   public decimal CervejaParametroPhMin { get; set; }

   [Range( 0.001, 99999.999, ErrorMessage = "O pH máximo deve ser maior que zero.")]
   public decimal CervejaParametroPhMax { get; set; }

   [Range(0.01, 99999.99, ErrorMessage = "O extrato mínimo deve ser maior que zero.")]
   public decimal CervejaParametroExtratoMin { get; set; }

   [Range( 0.01, 99999.99, ErrorMessage = "O extrato máximo deve ser maior que zero.")]
   public decimal CervejaParametroExtratoMax { get; set; }
   [MaxLength(2000, ErrorMessage = "A observação deve possuir no máximo 2000 caracteres.")]
   public string? CervejaParametroObservacao { get; set; }
}