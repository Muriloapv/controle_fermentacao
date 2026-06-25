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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cerveja>().HasQueryFilter         ( c => c.CervejaExclusao          == null);
        modelBuilder.Entity<CervejaEstilo>().HasQueryFilter   ( e => e.CervejaEstiloExclusao    == null);
        modelBuilder.Entity<CervejaParametro>().HasQueryFilter( p => p.CervejaParametroExclusao == null);
        modelBuilder.Entity<Lote>().HasQueryFilter            ( l => l.LoteExclusao             == null);
        modelBuilder.Entity<Tanque>().HasQueryFilter          ( t => t.TanqueExclusao           == null);
    }

    public DbSet<Cerveja> Cervejas { get; set; }
    public DbSet<CervejaEstilo> CervejaEstilos { get; set; }
    public DbSet<CervejaParametro> CervejaParametros { get; set; }

    public DbSet<Lote> Lotes { get; set; }
    public DbSet<Tanque> Tanques { get; set; }

    public DbSet<FermentacaoHistorico> FermentacaoHistoricos { get; set; }
}