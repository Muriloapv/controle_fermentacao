using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace arBrain.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CervejaEstilos",
                columns: table => new
                {
                    CervejaEstiloId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CervejaEstiloDescricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CervejaEstiloObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CervejaEstiloInclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CervejaEstiloExclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CervejaEstilos", x => x.CervejaEstiloId);
                });

            migrationBuilder.CreateTable(
                name: "Tanques",
                columns: table => new
                {
                    TanqueId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TanqueDescricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TanqueCapacidade = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    TanqueObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TanqueInclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TanqueExclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tanques", x => x.TanqueId);
                });

            migrationBuilder.CreateTable(
                name: "Cervejas",
                columns: table => new
                {
                    CervejaId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CervejaNome = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CervejaObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CervejaEstiloId = table.Column<int>(type: "integer", nullable: false),
                    CervejaInclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CervejaExclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cervejas", x => x.CervejaId);
                    table.ForeignKey(
                        name: "FK_Cervejas_CervejaEstilos_CervejaEstiloId",
                        column: x => x.CervejaEstiloId,
                        principalTable: "CervejaEstilos",
                        principalColumn: "CervejaEstiloId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CervejaParametros",
                columns: table => new
                {
                    CervejaParametroId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CervejaId = table.Column<int>(type: "integer", nullable: false),
                    CervejaParametroTemperaturaMin = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    CervejaParametroTemperaturaMax = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    CervejaParametroPhMin = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    CervejaParametroPhMax = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    CervejaParametroExtratoMin = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    CervejaParametroExtratoMax = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    CervejaParametroObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CervejaParametroInclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CervejaParametroExclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CervejaParametros", x => x.CervejaParametroId);
                    table.ForeignKey(
                        name: "FK_CervejaParametros_Cervejas_CervejaId",
                        column: x => x.CervejaId,
                        principalTable: "Cervejas",
                        principalColumn: "CervejaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lotes",
                columns: table => new
                {
                    LoteId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LoteDescricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    LoteQuantidade = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    LoteObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TanqueId = table.Column<int>(type: "integer", nullable: false),
                    CervejaId = table.Column<int>(type: "integer", nullable: false),
                    LoteInicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LoteFinalizacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LoteExclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lotes", x => x.LoteId);
                    table.ForeignKey(
                        name: "FK_Lotes_Cervejas_CervejaId",
                        column: x => x.CervejaId,
                        principalTable: "Cervejas",
                        principalColumn: "CervejaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lotes_Tanques_TanqueId",
                        column: x => x.TanqueId,
                        principalTable: "Tanques",
                        principalColumn: "TanqueId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FermentacaoHistoricos",
                columns: table => new
                {
                    HistoricoId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LoteId = table.Column<int>(type: "integer", nullable: false),
                    HistoricoPh = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    HistoricoTemperatura = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    HistoricoExtrato = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    HistoricoObservacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    HistoricoResponsavel = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    HistoricoDataColeta = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FermentacaoHistoricos", x => x.HistoricoId);
                    table.ForeignKey(
                        name: "FK_FermentacaoHistoricos_Lotes_LoteId",
                        column: x => x.LoteId,
                        principalTable: "Lotes",
                        principalColumn: "LoteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CervejaParametros_CervejaId",
                table: "CervejaParametros",
                column: "CervejaId");

            migrationBuilder.CreateIndex(
                name: "IX_Cervejas_CervejaEstiloId",
                table: "Cervejas",
                column: "CervejaEstiloId");

            migrationBuilder.CreateIndex(
                name: "IX_FermentacaoHistoricos_LoteId",
                table: "FermentacaoHistoricos",
                column: "LoteId");

            migrationBuilder.CreateIndex(
                name: "IX_Lotes_CervejaId",
                table: "Lotes",
                column: "CervejaId");

            migrationBuilder.CreateIndex(
                name: "IX_Lotes_TanqueId",
                table: "Lotes",
                column: "TanqueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CervejaParametros");

            migrationBuilder.DropTable(
                name: "FermentacaoHistoricos");

            migrationBuilder.DropTable(
                name: "Lotes");

            migrationBuilder.DropTable(
                name: "Cervejas");

            migrationBuilder.DropTable(
                name: "Tanques");

            migrationBuilder.DropTable(
                name: "CervejaEstilos");
        }
    }
}
