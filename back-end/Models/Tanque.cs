namespace arBrain.models
{
    public class Tanque
    {
        public int Tanque_Id { get; set; }
        public string Tanque_descricao { get; set; }
        public decimal Tanque_capacidade { get; set;}

        public string? Tanque_observacao { get; set;}

        public DateTime Tanque_inclusao { get; set;}
    }
}