using arBrain.Models;
using arBrain.Models.CervejaParametros;
using arBrain.Models.FermentacaoHistorico;
using arBrain.Models.Lote;
using arBrain.Models.Tanque;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Data;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions options) : base(options) { }

    //Função responsavel por fazer que as consultas não retorner registros _exclusao !=
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cerveja>()
            .HasQueryFilter(c => c.CervejaExclusao == null);
    }

    public DbSet<Cerveja> Cervejas { get; set; }
    public DbSet<CervejaEstilo> CervejaEstilos { get; set; }
    public DbSet<CervejaParametro> CervejaParametros { get; set; }

    public DbSet<Lote> Lotes { get; set; }
    public DbSet<Tanque> Tanques { get; set; }

    public DbSet<FermentacaoHistorico> FermentacaoHistoricos { get; set; }
}