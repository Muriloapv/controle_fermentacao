using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.CervejaEstilo;

public class CervejaEstiloDto
{
   [Required(ErrorMessage = "CervejaEstiloDescricao é um campo obrigatorio")]
   [MaxLength(200)]
   public string CervejaEstiloDescricao { get; set; } = string.Empty;

   [MaxLength(2000)]
   public string? CervejaEstiloObservacao { get; set; }
}