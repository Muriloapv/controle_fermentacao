namespace arBrain.models
{
    public class Cerveja
    {
        public int Cerveja_id { get; set; }

        public string Cerveja_nome { get; set; }

        public string? Cerveja_observacao { get; set; }  

        public int CervejaE_id { get; set; }

        public DateTime Cerveja_inclusao { get; set; }  

        public DateTime Cerveja_exclusao { get; set; }

    }
}