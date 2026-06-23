using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Models.CervejaParametros
{
   public class CervejaParametro
   {
      public int CervejaParametroId { get; set; }

      public int CervejaId { get; set; }

      [Precision(5, 2)]
      public decimal CervejaParametroTemperaturaMin { get; set; }

      [Precision(5, 2)]
      public decimal CervejaParametroTemperaturaMax { get; set; }

      [Precision(5, 3)]
      public decimal CervejaParametroPhMin { get; set; }

      [Precision(5, 3)]
      public decimal CervejaParametroPhMax { get; set; }

      [Precision(5, 2)]
      public decimal CervejaParametroExtratoMin { get; set; }

      [Precision(5, 2)]
      public decimal CervejaParametroExtratoMax { get; set; }

      [MaxLength(2000)]
      public string? CervejaParametroObservacao { get; set; }

      public DateTime CervejaParametroInclusao { get; set; } = DateTime.UtcNow;

      public DateTime? CervejaParametroExclusao { get; set; }
   }
}