using System.ComponentModel.DataAnnotations;

namespace arBrain.DTOs.Cerveja;

public class CervejaDto
{
   [Required(ErrorMessage = "cervejaNome é obrigatório")]
   [MaxLength(200)]
   public string CervejaNome { get; set; } = string.Empty;

   [MaxLength(2000)]
   public string? CervejaObservacao { get; set; }

   [Required(ErrorMessage = "cervejaEstilo é obrigatório")]
   public int CervejaEstiloId { get; set; }
}