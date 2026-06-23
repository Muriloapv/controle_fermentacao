namespace arBrain.Models
{
    public class Fermentacao_historico
    {
       public int Historico_id { get; set; } 

       public int Lote_id { get; set; }

       public decimal Historico_ph { get; set; }

       public decimal Historico_temperatura { get; set; }

       public decimal Historico_extrato { get; set; }

       public decimal Historico_observacao { get; set; }

       public string Historico_responsavel { get; set; }

       public DateTime Historico_dataColeta { get; set; }

    }
}